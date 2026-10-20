const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../dist/music.js'), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));
function setup(blocked = false) {
  const handlers = {};
  const button = {addEventListener(type,fn){this[type]=fn;},setAttribute(k,v){this[k]=v;},contains(target){return target===this;}};
  const label = {}, status = {};
  const audio = {
    paused:true,calls:0,blocked,handlers:{},
    addEventListener(type,fn){this.handlers[type]=fn;},
    play(){
      this.calls++;
      if (this.blocked) return Promise.reject({name:'NotAllowedError'});
      this.paused=false;this.handlers.playing?.();return Promise.resolve();
    },
    pause(){this.paused=true;this.handlers.pause?.();}
  };
  const nodes={'music-toggle':button,'music-label':label,'music-status':status,'background-music':audio};
  const document={hidden:false,getElementById:id=>nodes[id],addEventListener:(type,fn)=>handlers[type]=fn};
  vm.runInNewContext(script,{document,window:{addEventListener(){}}});
  return {audio,button,label,document,handlers};
}
(async () => {
  const allowed = setup();
  await flush();
  assert.equal(allowed.audio.calls,1,'Try autoplay on load');
  assert.equal(allowed.audio.paused,false);
  assert.equal(allowed.button['aria-pressed'],'true');
  allowed.button.click();
  assert.equal(allowed.audio.paused,true);
  allowed.handlers.click({target:{}});
  await flush();
  assert.equal(allowed.audio.calls,1,'A manual mute must survive other clicks');
  const blocked = setup(true);
  await flush();
  assert.equal(blocked.label.textContent,'Chạm để bật nhạc');
  blocked.audio.blocked=false;
  blocked.handlers.click({target:{}});
  await flush();
  assert.equal(blocked.audio.paused,false,'First gesture unlocks playback');
  blocked.button.click();
  blocked.handlers.click({target:blocked.button});
  await flush();
  assert.equal(blocked.audio.paused,true,'Click bubbling must not restart after mute');
  blocked.document.hidden=true;blocked.handlers.visibilitychange();
  blocked.document.hidden=false;blocked.handlers.visibilitychange();
  await flush();
  assert.equal(blocked.audio.paused,true,'Manual mute survives tab visibility changes');
  blocked.button.click();await flush();
  assert.equal(blocked.audio.paused,false);
  blocked.document.hidden=true;blocked.handlers.visibilitychange();
  assert.equal(blocked.audio.paused,true);
  blocked.document.hidden=false;blocked.handlers.visibilitychange();await flush();
  assert.equal(blocked.audio.paused,false,'Resume only when playback was requested');
  const source = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
  assert(source.includes('assets/tung-ngay-yeu-em.mp3'));
  assert(fs.statSync(path.join(__dirname,'../dist/assets/tung-ngay-yeu-em.mp3')).size>3000000);
  console.log('PASS: MP3 asset, allowed autoplay, blocked-autoplay fallback, manual mute, bubbling and tab resume.');
})().catch(error=>{console.error(error);process.exitCode=1;});
