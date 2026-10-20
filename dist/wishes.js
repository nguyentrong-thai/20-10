(() => {
  const messages = [
    'Mong bạn luôn tìm thấy một khoảng bình yên, ngay cả giữa những ngày nhiều bận rộn.',
    'Chúc nụ cười của bạn hôm nay được tiếp nối bằng thật nhiều niềm vui ngày mai.',
    'Mong những điều bạn âm thầm cố gắng sẽ sớm nở thành thành quả xứng đáng.',
    'Chúc bạn có đủ tự tin để chọn điều mình yêu và đủ dịu dàng để yêu chính mình.',
    'Mong mỗi buổi sáng đều mang đến cho bạn một lý do nhỏ để háo hức.',
    'Chúc bạn luôn được lắng nghe bằng sự chân thành và được đối xử bằng lòng tử tế.',
    'Mong những chuyến đi sắp tới đưa bạn đến nơi có cảnh đẹp và lòng nhẹ tênh.',
    'Chúc sức khỏe ở lại thật lâu, để bạn thảnh thơi tận hưởng những ngày đẹp trời.',
    'Mong bạn có một người để kể chuyện vui và một bờ vai khi cần nghỉ ngơi.',
    'Chúc ước mơ dù nhỏ đến đâu của bạn cũng có cơ hội được bắt đầu.',
    'Mong hôm nay có một lời hỏi thăm bất ngờ khiến lòng bạn ấm lại.',
    'Chúc bạn giữ được nét hồn nhiên của mình giữa bao đổi thay của cuộc sống.',
    'Mong những quyết định sắp tới dẫn bạn gần hơn tới cuộc sống mình mong muốn.',
    'Chúc bạn có những buổi tối yên ả, ngủ thật ngon và thức dậy thật nhẹ lòng.',
    'Mong mọi yêu thương bạn trao đi đều được đón nhận và trân trọng.',
    'Chúc bạn gặp những người khiến mình có thể thoải mái là chính mình.',
    'Mong chiếc cốc hôm nay có thức uống bạn thích, và ngày hôm nay có điều bạn chờ.',
    'Chúc bạn luôn có thời gian cho một sở thích khiến đôi mắt mình sáng lên.',
    'Mong những lo toan được vơi bớt và những niềm vui nhỏ ngày một đầy thêm.',
    'Chúc bạn đủ mạnh mẽ để bước tiếp và đủ an tâm để dừng lại khi cần.',
    'Mong bạn nhận ra mình đã tiến xa thế nào và tự hào về hành trình ấy.',
    'Chúc căn nhà của bạn luôn có tiếng cười và một góc thật ấm để trở về.',
    'Mong một cơ hội tốt sẽ đến đúng lúc bạn sẵn sàng mở cửa.',
    'Chúc bạn có những tình bạn bền lâu, giản dị mà không bao giờ nhạt.',
    'Mong bạn luôn nhìn thấy vẻ đẹp riêng của mình mà không cần so sánh với ai.',
    'Chúc những cuộc hẹn sắp tới đầy tiếng cười và những câu chuyện dễ thương.',
    'Mong bạn được tặng hoa cả vào những ngày chẳng có dịp đặc biệt nào.',
    'Chúc bạn đi qua ngày khó khăn với niềm tin rằng mình không phải đi một mình.',
    'Mong công việc mang đến cho bạn niềm vui, sự ghi nhận và những bước tiến mới.',
    'Chúc bạn đủ can đảm nói lời đồng ý với điều mới mẻ mà trái tim mình mong.',
    'Mong bạn cũng có thể nói lời từ chối thật nhẹ nhàng với điều khiến mình mệt mỏi.',
    'Chúc mọi mùa trong cuộc đời bạn đều có một điều đáng để yêu.',
    'Mong những kỷ niệm sắp tới đẹp đến mức bạn muốn giữ lại thật lâu.',
    'Chúc bạn gặp nhiều may mắn trên những con đường chưa từng đi qua.',
    'Mong bạn có một ngày được chiều chuộng, ăn ngon và chẳng phải vội vàng.',
    'Chúc trái tim bạn luôn còn chỗ cho sự tò mò và những bất ngờ nho nhỏ.',
    'Mong những người bạn thương luôn khỏe mạnh và ở gần nhau trong những dịp vui.',
    'Chúc bạn được yêu vì chính con người mình, cả những điều rất đỗi bình thường.',
    'Mong những trang sách, bản nhạc và câu chuyện hay sẽ tìm đến đúng lúc bạn cần.',
    'Chúc bạn có một cuối tuần thong thả, nắng vừa đủ và niềm vui thật đầy.',
    'Mong bạn luôn nhớ rằng nghỉ ngơi cũng là một phần của hành trình tốt đẹp.',
    'Chúc ý tưởng bạn đang ấp ủ tìm được thời điểm thật đẹp để thành hình.',
    'Mong mỗi bước nhỏ hôm nay đều góp vào một ngày mai vững vàng hơn.',
    'Chúc bạn giữ được sự ấm áp mà vẫn biết bảo vệ những ranh giới của mình.',
    'Mong một tin vui sẽ đến và khiến bạn muốn chia sẻ ngay với người mình quý.',
    'Chúc bạn luôn có điều để mong đợi, có người để thương và có nơi để thuộc về.',
    'Mong khi nhìn lại hôm nay, bạn sẽ nhớ một cảm giác thật dễ chịu.',
    'Chúc ngày 20/10 của bạn có hoa, có niềm vui và thật nhiều sự quan tâm.',
    'Mong đôi tay bạn luôn được nắm lấy bằng sự trân trọng, không chỉ trong ngày lễ.',
    'Chúc bạn tìm được nhịp sống vừa với mình, đủ đầy mà không phải vội.',
    'Mong những ngày mưa cũng có điều dễ thương chờ bạn dưới một mái hiên.',
    'Chúc bạn dám dành cho bản thân món quà mình đã thích từ lâu.',
    'Mong lòng tốt của bạn được gặp lòng tốt, và sự chân thành gặp sự chân thành.',
    'Chúc bạn có thêm một câu chuyện đáng nhớ để kể trong lần gặp gỡ tiếp theo.',
    'Mong bạn vẫn nhận ra những điều đẹp đẽ rất nhỏ: một tia nắng, một bông hoa, một lời chào.',
    'Chúc bạn được đón nhận cả khi rực rỡ lẫn những lúc chỉ muốn yên lặng.',
    'Mong những nỗi buồn cũ nhẹ dần, nhường chỗ cho điều mới dịu dàng hơn.',
    'Chúc bạn học được điều mình muốn học và vui với từng tiến bộ của chính mình.',
    'Mong ngày mai có một bất ngờ khiến bạn mỉm cười ngay khi thức dậy.',
    'Chúc bạn bước ra khỏi khu vườn này với một chút vui và thật nhiều yêu thương dành cho mình.'
  ];
  const titles = [
    'Bình an nhé', 'Nụ cười nở hoa', 'Cố gắng sẽ đơm bông', 'Tự tin là chính mình',
    'Chào ngày mới', 'Bạn xứng đáng được lắng nghe', 'Đi đến nơi lòng nhẹ tênh', 'Khỏe mạnh mỗi ngày',
    'Luôn có người bên cạnh', 'Ước mơ nở hoa', 'Một lời hỏi thăm ấm áp', 'Giữ mãi nét hồn nhiên',
    'Chọn điều khiến bạn hạnh phúc', 'Ngủ ngon, lòng an yên', 'Yêu thương được đáp lại', 'Thoải mái là mình',
    'Một ngày vừa ý', 'Dành thời gian cho đam mê', 'Niềm vui đầy thêm', 'Mạnh mẽ và dịu dàng',
    'Tự hào về chính bạn', 'Có một nơi để về', 'Cơ hội đang gõ cửa', 'Tình bạn mãi xanh',
    'Đẹp theo cách của bạn', 'Hẹn nhau những tiếng cười', 'Hoa cho cả ngày thường', 'Bạn không đi một mình',
    'Công việc thêm khởi sắc', 'Can đảm đón điều mới', 'Nhẹ nhàng nói không', 'Mùa nào cũng đáng yêu',
    'Thêm những kỷ niệm đẹp', 'May mắn trên đường đi', 'Hôm nay được chiều chuộng', 'Giữ trái tim tò mò',
    'Người thương luôn khỏe mạnh', 'Được yêu vì chính mình', 'Gặp điều hay đúng lúc', 'Cuối tuần thật thảnh thơi',
    'Cho mình được nghỉ ngơi', 'Ý tưởng thành hình', 'Từng bước tới ngày mai', 'Ấm áp và vững vàng',
    'Tin vui sắp ghé', 'Có nơi để thuộc về', 'Một ngày để nhớ', '20/10 thật rạng rỡ',
    'Được trân trọng mỗi ngày', 'Sống theo nhịp của mình', 'Ngày mưa cũng dễ thương', 'Tặng mình một món quà',
    'Lòng tốt gặp lòng tốt', 'Một câu chuyện đáng nhớ', 'Đẹp từ những điều nhỏ', 'Dịu dàng cả lúc lặng im',
    'Nhường chỗ cho niềm vui', 'Mỗi ngày thêm tiến bộ', 'Ngày mai có bất ngờ', 'Mang yêu thương về nhé'
  ];
  // Each page load starts a fresh garden; avoid repeats only within this visit.
  const used = new Set();
  try { localStorage.removeItem('flower-garden-read-wishes-v1'); } catch {}
  window.gardenWishes = {
    total: messages.length,
    remaining: () => messages.length - used.size,
    next() {
      const available = messages.map((_, i) => i).filter(i => !used.has(i));
      if (!available.length) return null;
      const id = available[Math.floor(Math.random() * available.length)];
      used.add(id);
      return { id, title: titles[id], text: messages[id] };
    }
  };
})();
