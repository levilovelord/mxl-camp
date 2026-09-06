// diagnostic_engine.js - 慕喜乐夫妻营高端心理学评估引擎 (活人感 · 临床洞察与反思版)
// 核心设计原则：
// 1. 彻底移除所有“破局微行动”与说教式建议，严禁任何未受邀的课后作业；
// 2. 彻底剔除生硬AI学术腔（如“神经解离”、“创伤雷达激活”等），换用真正有温度、懂人性的资深咨询师口吻；
// 3. 聚焦两大硬核维度：【日常相处真实写照】与【藏在背后的心理机制】；
// 4. 深度契合两性视角的直击心灵反思提问；
// 5. 守护基石严格基于真实高分（≥4分）提取，杜绝虚假套话。

function analyzeDimensionClinical(dimId, dimName, score, rawAnswers, familyContext) {
  const isHusband = familyContext.role === 'husband';
  const roleName = isHusband ? '丈夫' : '妻子';

  let levelText = '';
  let levelColor = '';
  if (score >= 80) { levelText = '同盟优势区'; levelColor = '#166534'; }
  else if (score >= 55) { levelText = '承压磨合区'; levelColor = '#B45309'; }
  else { levelText = '预警卡点区'; levelColor = '#DC2626'; }

  let behaviorPhenomenon = '';  // 1. 【日常相处真实写照】
  let psychologicalDefense = ''; // 2. 【藏在背后的心理机制】
  let coreInquiry = '';          // 3. 【直击内心的反思提问】

  if (dimId === 'conn') {
    // Q1(脆弱依靠), Q2(担心不被爱-反), Q3(身体亲密), Q4(合租室友-反), Q5(优先注意), Q6(害怕暴露-反)
    const q1 = rawAnswers[1] || 3;
    const q2 = rawAnswers[2] || 3;
    const q3 = rawAnswers[3] || 3;
    const q4 = rawAnswers[4] || 3;
    const q5 = rawAnswers[5] || 3;
    const q6 = rawAnswers[6] || 3;

    if (q4 >= 4 || q3 <= 2) {
      behaviorPhenomenon = '<b>【同住一个屋檐下的“陌生室友”】</b>白天各自上班奔忙，晚上回到家各看各的手机或围着孩子转，两个人很久没有过不带目的的拥抱、牵手或温存。虽然生活在同一个屋檐下，心里却觉得离对方很远，像是合伙维系家庭运转的室友，而不是亲密爱人。';
    } else if (q1 <= 2) {
      behaviorPhenomenon = '<b>【有委屈自己扛，心门悄悄关上】</b>当在外面遇到挫折、感到身心疲惫的时候，第一反应不是找伴侣倾诉，而是自己默默咽下去。因为总觉得“说了TA也不懂，甚至可能反过来挑剔我”，久而久之习惯了把脆弱藏起来，两个人都变成了彼此身边的孤岛。';
    } else {
      behaviorPhenomenon = '<b>【感情底子还在，但被琐事磨平了温存】</b>彼此心里其实都有对方，也没有大的背叛，但日复一日的工作、家务与琐碎把生活的精力榨干了。很久没有坐下来好好看看对方的眼睛、聊聊彼此的心情，关系渐渐变得干瘪、程序化。';
    }

    if (q6 >= 4 || q1 <= 2) {
      psychologicalDefense = '<b>【害怕失望，所以先把自己包裹起来】</b>在以往的生活或成长经历里，可能很早就习惯了“凡事只能靠自己，指望别人容易落空”。走进婚姻后，一旦感觉不到对方敏锐的回应，心里就会本能地退回自己的安全壳里。这并不是不爱或者冷漠，而是怕再次体会那种满怀期待却落空的难过与无力。';
    } else if (q2 >= 4) {
      psychologicalDefense = '<b>【特别在乎对方，稍有冷淡就心里发慌】</b>内心其实非常渴望被伴侣紧紧确认、被呵护。一旦对方显得疲倦、少言寡语或者回应慢了半拍，心里就会忍不住胡思乱想：“TA是不是不在乎我了？是不是嫌弃我了？” 这种焦虑会让人忍不住想要试探或反复确认。';
    } else {
      psychologicalDefense = '<b>【不是感情变淡了，而是心力透支了】</b>两个人对家庭其实都有深沉的依恋，只是长期的现实压力把心理能量消耗殆尽，导致在家里没有多余的心力去表达温柔，彼此都在咬牙硬撑。';
    }

    if (isHusband) {
      coreInquiry = '“当工作累得透不过气、心里感到特别挫败的时候，您是更习惯一个人在车里发呆、打游戏平复，还是觉得能毫无防备地抱着妻子，把心里的软弱和压力跟她说一说？”';
    } else {
      coreInquiry = '“当您想和丈夫亲近、渴望得到他的一点体贴，但他却心不在焉地盯着手机或敷衍应付时，您心里最真实的痛，是觉得被忽略的委屈，还是觉得自己在这段关系里很孤独？”';
    }

  } else if (dimId === 'comm') {
    // Q7(心平气和), Q8(指责挑剔-反), Q9(放下手机倾听), Q10(说了没用沉默-反), Q11(尊重立场), Q12(立刻辩解反咬-反)
    const q7 = rawAnswers[7] || 3;
    const q8 = rawAnswers[8] || 3;
    const q9 = rawAnswers[9] || 3;
    const q10 = rawAnswers[10] || 3;
    const q11 = rawAnswers[11] || 3;
    const q12 = rawAnswers[12] || 3;

    if (q10 >= 4) {
      behaviorPhenomenon = '<b>【“反正说了也没用”，干脆闭嘴】</b>在经历了太多次“满怀期待沟通却以失望或争吵收场”之后，心里彻底累了。现在遇到事情，第一反应就是“算了，随TA去吧，多说一句都是折磨”。表面上家里风平浪静，但心与心之间已经砌了一堵厚厚的隔音墙。';
    } else if (q8 >= 4 || q12 >= 4) {
      behaviorPhenomenon = '<b>【一开口就变成辩论赛和挑刺大会】</b>原本只是一件很小的日常琐事，但只要一开口，语气马上带刺，容易翻旧账、扣帽子（如“你每次都这样”、“你从来就没考虑过我”）。两个人都在急着争个对错输赢，好好的沟通瞬间变成了互相防守和反击。';
    } else if (q9 <= 2) {
      behaviorPhenomenon = '<b>【人在身边，心在别处】</b>一个人在说话，另一方眼睛却盯着手机或电视，嘴里敷衍地应着“嗯、好”。说话的人感觉自己像在对着空气倾倒，慢慢就失去了在琐碎日常里主动分享喜怒哀乐的热情。';
    } else {
      behaviorPhenomenon = '<b>【聊柴米油盐很顺，谈敏感心事有顾虑】</b>平时商量家务、孩子安排都很默契，但只要涉及到钱、父母长辈或者彼此心里不舒服的真实感受，气氛就会变得紧张，两个人都会下意识地绕着走。';
    }

    if (q8 >= 4 && q12 >= 4) {
      psychologicalDefense = '<b>【急于自卫，因为谁也不想当被否定的那个人】</b>一方挑刺指责，骨子里往往是在呼喊“你能不能重视一下我的感受！”；而另一方急于辩解反驳，本质上是在防御“我不想承认自己做得很糟、我很无能”。两个人都在用带刺的盔甲保护自己那颗容易受伤的心，结果扎得彼此鲜血淋漓。';
    } else if (q10 >= 4) {
      psychologicalDefense = '<b>【用沉默来保护自己不再受伤】</b>不再说话不是因为不在乎，而是因为过去太多的尝试都被打击或曲解了。把嘴闭上，至少可以避免新一轮的指责与内耗，是心力交瘁下唯一能想到的自我保护。';
    } else {
      psychologicalDefense = '<b>【急着用理性讲道理，错过了情绪的拥抱】</b>习惯于像解决工作问题一样去分析是非对错，本意是想尽快解决问题，却无意中忽略了对方此刻真正需要的，其实只是一个温暖的理解和情感上的被看见。';
    }

    if (isHusband) {
      coreInquiry = '“当妻子向您抱怨或情绪激动时，您心里是不是会下意识地觉得：‘你又在怪我没做好’，于是忍不住想要跟她讲道理、自证清白，甚至烦躁得想立刻走开？”';
    } else {
      coreInquiry = '“当您想好好跟丈夫聊聊，他却面无表情、一言不发或者转移话题时，那种被‘冷落和无视’的感觉，是不是比他跟您大吵一架还让您感到绝望？”';
    }

  } else if (dimId === 'conf') {
    // Q13(当天和好), Q14(追逃模式-反), Q15(聚焦事情), Q16(权力较量-反), Q17(顺势接台阶), Q18(狠话离婚念头-反)
    const q13 = rawAnswers[13] || 3;
    const q14 = rawAnswers[14] || 3;
    const q15 = rawAnswers[15] || 3;
    const q16 = rawAnswers[16] || 3;
    const q17 = rawAnswers[17] || 3;
    const q18 = rawAnswers[18] || 3;

    if (q17 <= 2 && q13 <= 2) {
      behaviorPhenomenon = '<b>【冷战拉锯，谁先低头谁就输了】</b>发生别扭或吵架之后，家里立刻陷入冰点，可以几天甚至更长时间谁也不理谁。哪怕心里其实已经后悔、盼着和好，却谁也不好意思或不甘心先给台阶，把彼此在沉默的冰窖里生生折磨好几天。';
    } else if (q14 >= 4) {
      behaviorPhenomenon = '<b>【一个追着要说法，一个窒息想逃跑】</b>一旦起争执，一方情绪激动、想要马上把话说清楚、要个态度；另一方却觉得被逼到墙角快要窒息，只想甩门出去或者把自己封闭起来。越追越逃，越逃越追，双方都被卷进恶性死循环。';
    } else if (q18 >= 4) {
      behaviorPhenomenon = '<b>【情绪失控说狠话，事后追悔莫及】</b>吵到极点时容易被愤怒冲昏头脑，脱口而出“这日子没法过了”、“离婚算了”等戳心窝的绝情话。哪怕事后知道这是气话，但留下的伤痕却久久难以愈合。';
    } else {
      behaviorPhenomenon = '<b>【克制克制再克制，但缺少真正和好的通道】</b>平时都很克制很少大吵大闹，但每次闹了不愉快，往往靠着时间自然冲淡，心里的疙瘩并没有真正解开，只是被暂时扫到了地毯下面。';
    }

    if (q14 >= 4) {
      psychologicalDefense = '<b>【追的人怕被抛弃，逃的人怕被击碎】</b>追击的一方心里在绝望地呼喊：“你转过身看着我，不要扔下我一个人受折磨！”；而撤退逃跑的一方心里在无助地求饶：“我不知道怎么应对了，我快要失控了，让我喘口气吧”。两个人都深陷恐惧，却用了相反的方式去抓救命稻草。';
    } else if (q16 >= 4) {
      psychologicalDefense = '<b>【把认错当成了尊严的妥协】</b>潜意识里把“先道歉、先示软”等同于“在这段关系里认栽、以后更没有地位”，宁可互相折磨，也不敢放下防备给对方一个拥抱。';
    } else {
      psychologicalDefense = '<b>【情绪彻底淹没，理智瞬间掉线】</b>当被伴侣的语气或指责激怒到一定程度，整个人都陷入了本能的战备防御中，那一刻听不进任何道理，只想把眼前的威胁和痛感挡在门外。';
    }

    if (isHusband) {
      coreInquiry = '“争吵激烈时，当您选择关上房门、走开或彻底沉默，您心底的真实想法，是觉得‘反正说什么都是错，我只想图个清静’，还是有一股快要压抑不住的怒火，怕真的爆发出来会把这个家给毁了？”';
    } else {
      coreInquiry = '“当吵架后丈夫转身离开、关上房门或者几天不理您时，那种被全世界抛弃一样的恐慌和委屈，是不是会让您忍不住想要狠狠敲打他、逼他给个回应？”';
    }

  } else if (dimId === 'emot') {
    // Q19(放松做自己), Q20(深深孤独-反), Q21(察觉低落安慰), Q22(单方委屈怨气-反), Q23(期待回家见伴侣), Q24(神经紧绷怕踩雷-反)
    const q19 = rawAnswers[19] || 3;
    const q20 = rawAnswers[20] || 3;
    const q21 = rawAnswers[21] || 3;
    const q22 = rawAnswers[22] || 3;
    const q23 = rawAnswers[23] || 3;
    const q24 = rawAnswers[24] || 3;

    if (q24 >= 4) {
      behaviorPhenomenon = '<b>【在家里小心翼翼，生怕哪句话没说对】</b>在家里整个人像绷紧的弦，随时在察言观色，生怕哪句话或者哪个动作又惹得对方不高兴。本该是最让人放松卸下防备的家，却成了最需要步步留心、耗费精力的战场。';
    } else if (q22 >= 4) {
      behaviorPhenomenon = '<b>【一个人默默付出，心里积满了无人看见的委屈】</b>觉得自己为这个家操碎了心、做了无数妥协，但伴侣好像觉得这一切都是理所应当的，连一句知冷知热的感谢都没有。委屈压在心底，慢慢变成了怎么看对方都不顺眼的怨气。';
    } else if (q20 >= 4) {
      behaviorPhenomenon = '<b>【最难受的不是一个人，而是两个人却依然孤独】</b>下班回家两人都在屋子里，但彼此之间像隔着一层玻璃罩子。快乐没人真正分享，心酸没人懂得心疼，深居婚姻之中，心底却常常涌起一种荒凉的孤单感。';
    } else {
      behaviorPhenomenon = '<b>【生活挺踏实，但很久没有心动与松弛了】</b>日子过得平稳安稳，但总觉得少了点真正的鲜活与松弛，两个人像是一对尽职尽责的“生活搭档”，缺少了那种开怀大笑、尽情做自己的自在。';
    }

    if (q24 >= 4) {
      psychologicalDefense = '<b>【对情绪高度敏感，不敢轻易做真实的自己】</b>可能在成长过程中或者过往的相处里，体验过太多不可预测的情绪风暴，导致现在对伴侣的一皱眉、一叹气都极其敏感，习惯性委屈自己来换取表面的和平。';
    } else if (q22 >= 4) {
      psychologicalDefense = '<b>【习惯默默付出，渴望被爱却不好意思直接要】</b>心里特别渴望被伴侣心疼和主动认可，但总觉得“如果非要我开口要，那就没意思了”。于是一边强撑着付出，一边在心里积攒失望，最终把两个人推向内耗。';
    } else {
      psychologicalDefense = '<b>【把家庭责任排在第一，把自己的心放在了最后】</b>习惯了顾及所有人，却唯独忘记了自己也是一个需要被宠爱、被体贴的普通人，长时间的心灵枯竭让整个人变得疲惫不堪。';
    }

    if (isHusband) {
      coreInquiry = '“当劳累了一整天下班走到家门口，拿出钥匙准备开门的那一刹那，您心里是觉得‘终于能回家歇歇脚、彻底放松了’，还是会下意识地先吸一口气，猜测今天家里的气氛是晴还是阴？”';
    } else {
      coreInquiry = '“在日复一日的家庭琐事和忙乱中，您是否经常觉得自己像一台停不下来的机器，所有人都在找您要结果，却很久没有人认真地问过您一句：‘你最近累不累，心里委屈吗？’？”';
    }

  } else if (dimId === 'sati') {
    // Q25(整体满意), Q26(满意对方付出), Q27(重选依然结婚), Q28(未来悲观-反), Q29(中上水平), Q30(仅维持责任-反)
    const q25 = rawAnswers[25] || 3;
    const q26 = rawAnswers[26] || 3;
    const q27 = rawAnswers[27] || 3;
    const q28 = rawAnswers[28] || 3;
    const q29 = rawAnswers[29] || 3;
    const q30 = rawAnswers[30] || 3;

    if (q30 >= 4 && q27 <= 3) {
      behaviorPhenomenon = '<b>【靠着责任和孩子维系，对当初的选择感到迷茫】</b>答卷很诚实地折射出当前的无奈：“要不是为了孩子和对这个家的责任，可能早就过不下去了”。偶尔静下来的时候，甚至会忍不住怀疑当年选择走进这段婚姻到底对不对，心里充满了倦怠与叹息。';
    } else if (score < 50) {
      behaviorPhenomenon = '<b>【失望攒够了，对未来不抱太多指望】</b>在太多具体的事情上经历过伤心和碰壁，现在整个人变得有些悲观，觉得“我们可能这辈子也就这样了，变不好了”。对关系的未来失去了期待，只是机械地熬着过日子。';
    } else {
      behaviorPhenomenon = '<b>【大方向踏实稳定，但缺少令人心动的共同期盼】</b>总体对当下的家庭生活是认可的，也认同彼此的忠诚与责任，只是觉得日子有些一眼望到头的沉闷，两个人缺少一个能够一起眼睛发亮、共同去实现的未来愿景。';
    }

    if (q30 >= 4) {
      psychologicalDefense = '<b>【把婚姻降级为“搭伙履约”，是为了防止心再受伤】</b>因为在感情上受过太多次挫折，于是潜意识里给自己穿上了一层铠甲：“只要我不再对爱情抱有幻想，只要把它当成养娃搞钱的责任，我就不会再为你心碎”。这种麻木，其实是一种深深的自我保护。';
    } else {
      psychologicalDefense = '<b>【看对方容易挑毛病，忽略了默默付出的好】</b>当关系受挫时，人的大脑很容易戴上“消极滤镜”，满眼看到的都是对方没做好的地方、生活里的缺点，而慢慢遗忘了对方在漫长岁月里同样为了这个家付出的汗水与不易。';
    }

    if (isHusband) {
      coreInquiry = '“如果给这段婚姻一个重新注入活力的机会，抛开所有现实的条条框框，您心里最渴望妻子能在哪个方面由衷地认可您一次、夸赞您一次？”';
    } else {
      coreInquiry = '“如果在眼下的婚姻生活里，只允许发生一个哪怕很小但很具体的改变，您最希望丈夫为这个家做出的一点什么改变？”';
    }

  } else if (dimId === 'func') {
    // Q31(财务共识), Q32(家务育儿分工合理), Q33(父母界限同盟), Q34(家务育儿内耗-反), Q35(专属二人时光), Q36(重大决策分歧-反)
    const q31 = rawAnswers[31] || 3;
    const q32 = rawAnswers[32] || 3;
    const q33 = rawAnswers[33] || 3;
    const q34 = rawAnswers[34] || 3;
    const q35 = rawAnswers[35] || 3;
    const q36 = rawAnswers[36] || 3;

    if (q35 <= 2) {
      behaviorPhenomenon = '<b>【被琐事填满的生活，挤不出半点属于两人的时间】</b>所有的精力和谈话几乎被工作、房贷、接送孩子和家务杂事占得满满当当。两个人很久没有一起单独散过步、吃过一顿不用赶时间的饭，夫妻完全退化成了“家政与育儿合伙人”。';
    } else if (q34 >= 4) {
      behaviorPhenomenon = '<b>【为谁干多干少暗暗较劲，日常协作变成消耗】</b>在洗衣做饭、照顾孩子等鸡毛蒜皮的琐事上经常互相埋怨。一方觉得对方甩手掌柜、被动懒散；另一方觉得对方要求苛刻、怎么做都不讨好，一件小事就能闹得双方都不痛快。';
    } else {
      behaviorPhenomenon = '<b>【大体配合默契，细节边界还需理顺】</b>过日子的分工大框架是成立的，但在某些突发事务的应对、个人休息时间的分摊上，偶尔还是会觉得步调不够一致，有委屈没说透。';
    }

    if (q33 <= 2) {
      psychologicalDefense = '<b>【公婆或岳父母介入，夫妻没有站成铁板一块】</b>面对双方父母的意见或干预时，夫妻之间没有形成一致对外的“第一同盟”。一旦长辈插手家里的规矩或带娃方式，两个人不仅没能互相撑腰，反而把矛盾转化成了夫妻之间的内耗。';
    } else if (q34 >= 4) {
      psychologicalDefense = '<b>【干活容易，真正让人崩溃的是“操心”】</b>夫妻矛盾的核心往往不只是谁洗了几个碗，而是一方总要在大脑里统筹所有琐事（孩子要买什么、老人生病要带去哪里），而另一方却必须“推一下动一下”。这种心智上的不对称负担，极易让操心的人感到被压垮。';
    } else {
      psychologicalDefense = '<b>【以为成了老夫老妻，就可以不讲究情感仪式】</b>觉得都结了婚过日子了，搞那些形式主义没必要。可正是这种“务实”，慢慢抽干了婚姻原本该有的乐趣与温度。';
    }

    if (isHusband) {
      coreInquiry = '“在日常家务和照顾孩子的琐事上，您心底真实的无力感，是觉得自己不管怎么做好像都很难达到妻子的标准、经常挨挑剔，还是觉得两个人对‘过好日子’的标准原本就有些不同？”';
    } else {
      coreInquiry = '“在每天的家庭运转中，那些看不见却极度耗费精力的操心事（孩子教育、人情往来、家里缺什么），是不是几乎全压在您一个人的脑子里，而丈夫往往只是被动等吩咐、甚至觉得您在‘瞎操心’？”';
    }
  }

  return {
    score,
    levelText,
    levelColor,
    behaviorPhenomenon,
    psychologicalDefense,
    coreInquiry
  };
}

// 严谨动态提炼关系守护基石（只提炼得分 ≥ 4 的真正优势项，坚决拒绝虚假硬夸）
function extractRelationshipStrengths(ans) {
  const strengths = [];

  // Q15: 发生分歧聚焦事情人品 (正向题，≥4 分才算优势)
  if (ans[15] >= 4) {
    strengths.push({
      title: '吵架不攻击彼此人品，恪守做人底线',
      qid: 15,
      score: ans[15],
      desc: '在发生分歧甚至情绪激动时，依然能够努力就事论事，没有陷入毁灭性的“恶语中伤与人格侮辱”，表明双方心底深处对彼此依然保留着做人底线的敬意。'
    });
  }

  // Q18: 激烈争吵时不提离婚分开 (反向题，raw <= 2 则反向健康分为 >= 4 分)
  if (ans[18] <= 2) {
    strengths.push({
      title: '守住婚姻的承诺感依然坚定',
      qid: 18,
      score: 6 - ans[18],
      desc: '即使争执激烈、心里受尽委屈，也极少轻易拿“离婚、拆伙”当威胁或口头禅，表明对这段婚姻的契约承诺相当坚实，双方都在努力维系这个家。'
    });
  }

  // Q33: 原生家庭界限清晰同盟 (正向题，≥4 分)
  if (ans[33] >= 4) {
    strengths.push({
      title: '原生家庭界限清晰，夫妻站在一起',
      qid: 33,
      score: ans[33],
      desc: '在面对双方父母长辈及亲戚时，能够建立起相对健康的“夫妻同盟”，没有因外部长辈的介入或干涉导致核心家庭的撕裂。'
    });
  }

  // Q36: 重大决策达成共识 (反向题，raw <= 2 则反向健康分为 >= 4 分)
  if (ans[36] <= 2) {
    strengths.push({
      title: '家庭大方向与人生底盘高度同频',
      qid: 36,
      score: 6 - ans[36],
      desc: '在家庭大方向、置业、财务或重要人生选择上，依然具备达成共识的能力，这是漫长岁月航行中极其不可多得的压舱石。'
    });
  }

  // Q31: 财务管理互信良好 (正向题，≥4 分)
  if (ans[31] >= 4) {
    strengths.push({
      title: '财务透明度与经济互信良好',
      qid: 31,
      score: ans[31],
      desc: '在经济收支和家庭财务安排上保持着基本的透明与互信，有效规避了亲密关系中最具杀伤力的金钱猜忌。'
    });
  }

  // Q11: 观点不一致仍尊重立场 (正向题，≥4 分)
  if (ans[11] >= 4) {
    strengths.push({
      title: '即使想法不同，依然尊重对方的立场',
      qid: 11,
      score: ans[11],
      desc: '即使彼此观念不一致，也愿意倾听并尊重对方的角度，具备难得的理性与包容底色。'
    });
  }

  // Q27: 初心认同 (严谨校验：只有当 Q27 ≥ 4 且 Q30 <= 2 时，才允许生成初心深厚，杜绝前后自相矛盾！)
  if (ans[27] >= 4 && ans[30] <= 2) {
    strengths.push({
      title: '初心情感认同依然深厚',
      qid: 27,
      score: ans[27],
      desc: '即使经历现实风雨与疲惫，骨子里依然认可当年的相识与结合，这段关系的初心依然散发着生命的微光。'
    });
  }

  return strengths;
}

// 独立高清矢量雷达图生成器 (SVG)
function generateRadarSVG(scoresMap, size = 260) {
  const dims = [
    { id: 'conn', name: '情感连接' },
    { id: 'comm', name: '沟通表达' },
    { id: 'conf', name: '冲突模式' },
    { id: 'emot', name: '情绪体验' },
    { id: 'sati', name: '关系满意' },
    { id: 'func', name: '关系功能' }
  ];
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const numAxes = dims.length;
  const angleStep = (Math.PI * 2) / numAxes;

  let gridSvg = '';
  for (let l = 1; l <= 5; l++) {
    const r = (radius / 5) * l;
    let points = [];
    for (let i = 0; i < numAxes; i++) {
      const a = i * angleStep - Math.PI / 2;
      points.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    gridSvg += '<polygon points="' + points.join(' ') + '" fill="none" stroke="#E2E8F0" stroke-width="1"/>';
  }

  let axesSvg = '';
  let labelsSvg = '';
  for (let i = 0; i < numAxes; i++) {
    const a = i * angleStep - Math.PI / 2;
    const x = cx + radius * Math.cos(a);
    const y = cy + radius * Math.sin(a);
    axesSvg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#CBD5E1" stroke-width="1"/>';

    const lx = cx + (radius + 24) * Math.cos(a);
    const ly = cy + (radius + 18) * Math.sin(a);
    const sVal = scoresMap[dims[i].id] || 0;
    labelsSvg += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="10.5" font-weight="bold" fill="#334155" text-anchor="middle" dominant-baseline="central">' + dims[i].name + ' ' + sVal + '分</text>';
  }

  let dataPoints = [];
  let dotsSvg = '';
  for (let i = 0; i < numAxes; i++) {
    const a = i * angleStep - Math.PI / 2;
    const s = Math.max(0, Math.min(100, scoresMap[dims[i].id] || 0));
    const r = (radius * s) / 100;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    dataPoints.push(x.toFixed(1) + ',' + y.toFixed(1));
    dotsSvg += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.5" fill="#D97706" stroke="#FFF" stroke-width="1.5"/>';
  }

  const polygonSvg = '<polygon points="' + dataPoints.join(' ') + '" fill="rgba(217, 119, 6, 0.22)" stroke="#D97706" stroke-width="2.2"/>';

  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="max-width:100%; height:auto;">' + gridSvg + axesSvg + polygonSvg + dotsSvg + labelsSvg + '</svg>';
}

function getOptionLabel(val) {
  switch(Number(val)) {
    case 1: return "极不符合";
    case 2: return "较不符合";
    case 3: return "中立/不确定";
    case 4: return "比较符合";
    case 5: return "完全符合";
    default: return "未标注";
  }
}

function generateDualRadarSVG(husbandScores, wifeScores, size) {
  size = size || 260;
  var dims = [
    { id: 'conn', name: '情感连接' },
    { id: 'comm', name: '沟通表达' },
    { id: 'conf', name: '冲突模式' },
    { id: 'emot', name: '情绪体验' },
    { id: 'sati', name: '关系满意' },
    { id: 'func', name: '关系功能' }
  ];
  var cx = size / 2;
  var cy = size / 2;
  var radius = size * 0.35;
  var numAxes = dims.length;
  var angleStep = (Math.PI * 2) / numAxes;

  var gridSvg = '';
  for (var l = 1; l <= 5; l++) {
    var r = (radius / 5) * l;
    var points = [];
    for (var i = 0; i < numAxes; i++) {
      var a = i * angleStep - Math.PI / 2;
      points.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    gridSvg += '<polygon points="' + points.join(' ') + '" fill="none" stroke="#E2E8F0" stroke-width="1"/>';
  }

  var axesSvg = '';
  var labelsSvg = '';
  for (var i = 0; i < numAxes; i++) {
    var a = i * angleStep - Math.PI / 2;
    var x = cx + radius * Math.cos(a);
    var y = cy + radius * Math.sin(a);
    axesSvg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#CBD5E1" stroke-width="1"/>';

    var lx = cx + (radius + 25) * Math.cos(a);
    var ly = cy + (radius + 18) * Math.sin(a);
    labelsSvg += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle" dominant-baseline="central">' + dims[i].name + '</text>';
  }

  var hPoints = [];
  var hDots = '';
  var wPoints = [];
  var wDots = '';

  for (var i = 0; i < numAxes; i++) {
    var a = i * angleStep - Math.PI / 2;
    var hs = Math.max(0, Math.min(100, (husbandScores && husbandScores[dims[i].id]) || 0));
    var ws = Math.max(0, Math.min(100, (wifeScores && wifeScores[dims[i].id]) || 0));

    var hr = (radius * hs) / 100;
    var hx = cx + hr * Math.cos(a);
    var hy = cy + hr * Math.sin(a);
    hPoints.push(hx.toFixed(1) + ',' + hy.toFixed(1));
    hDots += '<circle cx="' + hx.toFixed(1) + '" cy="' + hy.toFixed(1) + '" r="3" fill="#2563EB" stroke="#FFF" stroke-width="1"/>';

    var wr = (radius * ws) / 100;
    var wx = cx + wr * Math.cos(a);
    var wy = cy + wr * Math.sin(a);
    wPoints.push(wx.toFixed(1) + ',' + wy.toFixed(1));
    wDots += '<circle cx="' + wx.toFixed(1) + '" cy="' + wy.toFixed(1) + '" r="3" fill="#BE185D" stroke="#FFF" stroke-width="1"/>';
  }

  var hPoly = '<polygon points="' + hPoints.join(' ') + '" fill="rgba(37, 99, 235, 0.18)" stroke="#2563EB" stroke-width="2"/>';
  var wPoly = '<polygon points="' + wPoints.join(' ') + '" fill="rgba(190, 24, 93, 0.18)" stroke="#BE185D" stroke-width="2"/>';

  var legend = '<g transform="translate(' + (cx - 75) + ', 12)">' +
    '<circle cx="0" cy="0" r="4" fill="#2563EB"/>' +
    '<text x="7" y="3" font-size="9.5" font-weight="bold" fill="#2563EB">👨 丈夫得分</text>' +
    '<circle cx="78" cy="0" r="4" fill="#BE185D"/>' +
    '<text x="85" y="3" font-size="9.5" font-weight="bold" fill="#BE185D">👩 妻子得分</text>' +
    '</g>';

  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="max-width:100%; height:auto;">' +
    gridSvg + axesSvg + hPoly + wPoly + hDots + wDots + labelsSvg + legend + '</svg>';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { analyzeDimensionClinical, extractRelationshipStrengths, generateRadarSVG, generateDualRadarSVG, getOptionLabel };
}
