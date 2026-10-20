const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '../dist', name), 'utf8');
const saved = new Map();
const storage = {getItem:key=>saved.get(key)||null,setItem:(key,value)=>saved.set(key,value),removeItem:key=>saved.delete(key)};
function wishContext(localStorage = storage) {
  const context = {window:{},localStorage,Math,Set,JSON,Number};
  vm.runInNewContext(read('wishes.js'), context);
  return context.window.gardenWishes;
}
const first = wishContext();
const seen = new Set();
const seenTitles = new Set();
for (let i = 0; i < 60; i++) {
  const wish = first.next();
  assert(!seen.has(wish.text), 'No repeated wishes during one visit');
  assert(wish.title && !seenTitles.has(wish.title), 'Each wish has a distinct heading');
  seen.add(wish.text);
  seenTitles.add(wish.title);
}
assert.equal(seen.size,60);
assert.equal(seenTitles.size,60);
assert.equal(first.remaining(),0);
assert.equal(first.next(),null,'Do not recycle exhausted wishes in the same visit');
saved.set('flower-garden-read-wishes-v1',JSON.stringify(Array.from({length:60},(_,i)=>i)));
const refreshed = wishContext();
assert.equal(refreshed.remaining(),60,'Reload resets all wishes even with legacy saved progress');
assert(refreshed.next());
assert(!saved.has('flower-garden-read-wishes-v1'));
const blockedStorage = wishContext({getItem(){throw Error();},setItem(){throw Error();}});
assert.equal(blockedStorage.remaining(),60);
assert.notEqual(blockedStorage.next().text,blockedStorage.next().text);

function element() {
  const classes = new Set();
  return {
    hidden:false,inert:true,children:[],dataset:{},textContent:'',style:{setProperty(k,v){this[k]=v}},
    classList:{add(...xs){xs.forEach(x=>classes.add(x));},remove(...xs){xs.forEach(x=>classes.delete(x));},toggle(){},contains:x=>classes.has(x)},
    addEventListener(type,fn){this[type==='close'?'onclose':type]=fn;},appendChild(child){this.children.push(child);},
    querySelector(){return this.childButton ||= element();},querySelectorAll(){return [];},
    focus(){},showModal(){this.open=true;},close(){this.open=false;this.onclose?.();},
    getBoundingClientRect(){return {left:0,right:500,top:0,bottom:500};},
    setAttribute(key,value){this[key]=value;}
  };
}
const ids = ['intro','letter','open','petals','flower-field','garden-actions','wish-dialog','wish-counter',
  'wish-flower','wish-species','wish-text','wish-title','close-wish','continue-garden','again','status',
  'back','hint','view-garden','read-again','letter-title','identity-gate','identity-choice',
  'identity-warning','identity-refusal','warning-mark','female-choice',
  'male-choice','insist-male','back-to-identity','back-from-refusal','site-content'];
const nodes = Object.fromEntries(ids.map(id=>[id,element()]));
nodes['identity-warning'].hidden = true;
nodes['identity-refusal'].hidden = true;
nodes['identity-gate'].hidden = false;
const timeouts=[];
const document = {hidden:false,body:element(),getElementById:id=>nodes[id],createElement:element,
  createDocumentFragment:element,addEventListener(){}};
const context = {document,window:{gardenWishes:blockedStorage,matchMedia:()=>({matches:false}),scrollTo(){},addEventListener(){}},
  Image:class{decode(){return Promise.resolve();}},Math,Promise,
  setInterval:()=>1,clearInterval(){},setTimeout:(fn,ms)=>(timeouts.push({fn,ms}),timeouts.length),clearTimeout(){}};
async function run() {
  vm.runInNewContext(read('script.js'),context);
  nodes['male-choice'].click();
  assert(!nodes['identity-warning'].hidden,'Male selection opens the warning');
  assert.equal(nodes['site-content'].inert,true,'The website stays inaccessible from the warning');
  for(let i=1;i<=10;i++) nodes['insist-male'].click();
  assert(nodes['identity-refusal'].hidden===false,'Ten confirmations open the refusal screen');
  assert(!read('index.html').includes('Lần xác nhận'),'Confirmation count stays hidden');
  assert(read('index.html').includes('src="assets/refusal.webp"'));
  nodes['back-from-refusal'].click();
  assert(!nodes['identity-choice'].hidden,'Returning from refusal restores the choice');
  nodes['female-choice'].click();
  assert(nodes['identity-gate'].hidden,'Female selection opens the original greeting');
  assert.equal(nodes['site-content'].inert,false);
  assert.equal(nodes['flower-field'].children[0].children.length,32);
  await nodes.open.click();
  timeouts.find(t=>t.ms===2300).fn();
  nodes['view-garden'].click();
  assert.equal(nodes['flower-field'].inert,false);
  nodes['flower-field'].children[0].children[0].childButton.click();
  assert(nodes['wish-dialog'].open);
  assert(nodes['wish-text'].textContent.length>20);
  const previous = nodes['wish-text'].textContent;
  const previousTitle = nodes['wish-title'].textContent;
  nodes['flower-field'].children[0].children[0].childButton.click();
  assert.notEqual(nodes['wish-text'].textContent,previous);
  assert.notEqual(nodes['wish-title'].textContent,previousTitle);
  nodes['close-wish'].click();
  assert(!nodes['wish-dialog'].open);
  nodes['read-again'].click();
  assert.equal(nodes['flower-field'].inert,true);
  nodes.back.click();
  assert(!nodes.intro.hidden);
  assert(!read('index.html').includes('name-card'),'Cancelled name screen stays removed');
  assert(!read('script.js').includes('approachPointer'),'Cancelled chasing button stays removed');
  assert(read('index.html').includes('light only'));
  assert(!read('index.html').includes('made by tung'));
  console.log('PASS: identity gate, ten-step refusal, 60 unique wishes, flower modal and navigation.');

}
run().catch(error=>{console.error(error);process.exitCode=1;});
