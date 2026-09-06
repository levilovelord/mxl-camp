// diagnostic_engine.js - 慕喜乐夫妻营高端心理学评估引擎 (V6 黄金三段式与动态精准诊断版)
// 核心设计原则：
// 1. 结构精炼为“三段式黄金结构”：【行为现象】 ➔ 【深层心理机制】 ➔ 【落地微行动与直击内心的自省提问】；
// 2. 彻底移除重复机械的“阶段特征”段落与冗余套话，把版面留给硬核临床分析；
// 3. 严格两性分流提问，直击痛点，拒绝空泛说教；
// 4. 守护基石严格基于真实作答（≥4分）动态生成，若出现妥协/不确定（如第30题/第27题）坚决剔除并预警，拒绝虚假夸赞。

function analyzeDimensionClinical(dimId, dimName, score, rawAnswers, familyContext) {
  const isHusband = familyContext.role === 'husband';
  const roleName = isHusband ? '丈夫' : '妻子';

  let levelText = '';
  let levelColor = '';
  if (score >= 80) { levelText = '同盟优势区'; levelColor = '#166534'; }
  else if (score >= 55) { levelText = '承压磨合区'; levelColor = '#B45309'; }
  else { levelText = '预警卡点区'; levelColor = '#DC2626'; }

  let behaviorPhenomenon = '';  // 1. 【行为现象】
  let psychologicalDefense = ''; // 2. 【深层心理防御机制】
  let breakAction = '';          // 3. 【本周破局微行动】
  let coreInquiry = '';          // 4. 【直击内心的自省提问】

  if (dimId === 'conn') {
    // Q1(脆弱依靠), Q2(担心不被爱-反), Q3(身体亲密), Q4(合租室友-反), Q5(优先注意), Q6(害怕暴露-反)
    const q1 = rawAnswers[1] || 3;
    const q2 = rawAnswers[2] || 3;
    const q3 = rawAnswers[3] || 3;
    const q4 = rawAnswers[4] || 3;
    const q5 = rawAnswers[5] || 3;
    const q6 = rawAnswers[6] || 3;

    if (q4 >= 4 || q3 <= 2) {
      behaviorPhenomenon = '<b>【合租室友化与微拒绝】</b>作答显示身体温存与心灵共鸣受挫。夫妻退化为日常事务与家庭运转的执行搭档，白天各奔东西，夜晚背对背沉浸于屏幕，深层脆弱感失去承接空间。';
    } else if (q1 <= 2) {
      behaviorPhenomenon = '<b>【脆弱阻滞与内在孤岛】</b>当在外遭遇挫折或身心俱疲时，习惯性判定向伴侣倾诉的解释成本过高，索性独自消化，两颗心在客气与克制中筑起了心理围墙。';
    } else {
      behaviorPhenomenon = '<b>【节奏错位与情感微失联】</b>情感基础尚在，但忙碌与琐事逐渐蚕食了专属关注，情感连接容易在功能性运转中钝化。';
    }

    if (q6 >= 4 || q1 <= 2) {
      psychologicalDefense = '<b>【回避依恋与情感节能模式】</b>成长经历中常内化了“依赖他人是不安全的、唯有靠自己才稳妥”的硬壳。走进婚姻后，一旦关系需要深层袒露脆弱，便本能退回内心堡垒，沉默并非不爱，而是情感电量耗尽时的自我防御。';
    } else if (q2 >= 4) {
      psychologicalDefense = '<b>【焦虑型高警觉监测】</b>内心对被确认与被爱高度渴求，伴侣因疲惫造成的沉默或迟钝，极易被潜意识自动解读为“感情变淡或忽视”，进而激发内耗或试探。';
    } else {
      psychologicalDefense = '<b>【安全基底上的事务性消耗】</b>具备相对平稳的信任底色，当前主要受制于外部压力引发的心理能量透支。';
    }

    breakAction = '今晚睡前尝试一次<b>无事务目的的“30秒温存拥抱”</b>或主动递一杯温水，不谈孩子、家务与工作，打破日常肢体接触与情感可及性的坚冰。';

    if (isHusband) {
      coreInquiry = '“在工作压力极大、感到身心俱疲的时刻，您是更习惯一个人在车里或书房独处平复，还是觉得能随时向妻子诉说内心的无力和挫折？”';
    } else {
      coreInquiry = '“当您渴望得到丈夫的倾听和温存，却发现他心不在焉或沉浸在手机/工作里时，您心底最强烈的感受是被忽略的委屈，还是深深的孤独？”';
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
      behaviorPhenomenon = '<b>【习得性沉默与沟通筑墙】</b>答卷强烈提示“说了也没用，索性闭嘴”。在多次表达未获理想回响后启动了心理撤退，虽然规避了正面争端，却在心底积累了厚重的疏离感。';
    } else if (q8 >= 4 || q12 >= 4) {
      behaviorPhenomenon = '<b>【法庭对质与定性评判】</b>对话极易滑向讲道理、翻旧账或定性评价（如“你总是……”、“你从来都……”），就事论事被迅速置换为“是非对错与责任审判”。';
    } else if (q9 <= 2) {
      behaviorPhenomenon = '<b>【倾听失焦与微冷落感】</b>伴侣表达时常伴随注视屏幕或心不在焉，缺乏眼神与情感确认，逐渐消磨了主动分享日常的兴致。';
    } else {
      behaviorPhenomenon = '<b>【日常交流通畅，敏感议题存顾虑】</b>常规事务交流顺畅，但在涉及观念分歧的深水区议题时仍存在防御性回避。';
    }

    if (q8 >= 4 && q12 >= 4) {
      psychologicalDefense = '<b>【评判-防卫应激回路】</b>指责的表象下包裹着“极度渴望被看见却求而不得的绝望”，而辩解反击则是“害怕被全盘否定、捍卫自身价值的自尊保卫战”，双方都在用刺刀保护受伤的心。';
    } else if (q10 >= 4) {
      psychologicalDefense = '<b>【绝望感引发的保护性关机】</b>由于预期得不到理解，机体本能切断了沟通通路，用冷漠与沉默隔绝进一步的挫败。';
    } else {
      psychologicalDefense = '<b>【理性思维对情感确认的替代】</b>习惯用工程师思维提方案、讲逻辑，无意中阻断了伴侣感受层面的流动与确认。';
    }

    breakAction = '伴侣下一次主动开口时，刻意<b>将手机屏幕朝下扣在桌面上</b>，专注注视对方眼睛听完前三句话，先回应一句“听起来你今天挺不容易的”，再谈事情。';

    if (isHusband) {
      coreInquiry = '“当妻子向您倒苦水或表达情绪时，您是否会下意识觉得她在责怪您没把事情处理好，从而急于辩解或给出解决步骤？”';
    } else {
      coreInquiry = '“当您发现丈夫对您的提议只是机械应答或陷入沉默时，这种无回应会让您感到加倍愤怒，还是感到自己不被重视？”';
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
      behaviorPhenomenon = '<b>【僵局冷战与台阶断裂】</b>误会产生后双方均退守防线，谁也不愿率先示弱，原本微小的摩擦被拉长为持续数天的冷暴力与情绪内耗。';
    } else if (q14 >= 4) {
      behaviorPhenomenon = '<b>【追退失衡与压迫感】</b>冲突升级时往往呈现一方步步紧逼索要交代、另一方感到窒息落荒而逃的追逃拉扯态势。';
    } else if (q18 >= 4) {
      behaviorPhenomenon = '<b>【极端言语与情绪爆表】</b>高压争吵时容易被情绪绑架说出绝情狠话，给双方信任带来次生创伤。';
    } else {
      behaviorPhenomenon = '<b>【冲突克制，缺少快速修复通道】</b>底线意识明确，但在争吵后的降温与和解节奏上仍缺乏成熟默契。';
    }

    if (q14 >= 4) {
      psychologicalDefense = '<b>【EFT 追-逃死锁机制】</b>紧追方内心在呼喊“不要扔下我一人！”，退避方内心在呼喊“我感到无能为力，必须撤离才能避免毁灭”。双方都在用自己的习惯捍卫安全，却形成了致命互激。';
    } else if (q16 >= 4) {
      psychologicalDefense = '<b>【权力较量与自尊保卫】</b>潜意识将观点妥协等同于地位丧失，陷入“谁先认输谁就输了整段关系”的零和博弈思维。';
    } else {
      psychologicalDefense = '<b>【情绪过载下的神经解离】</b>当生理心率超标时大脑理性中枢短暂关闭，机体进入原始的战斗或逃跑状态。';
    }

    breakAction = '与伴侣达成一个默契的<b>“争吵暂停手势”</b>（如双手比 T 或约定暗号），一旦有人情绪过载，无条件各自深呼吸冷静 15 分钟再谈，绝不摔门或无声失联。';

    if (isHusband) {
      coreInquiry = '“争吵激烈时，当您选择关门、走开或彻底沉默，真实原因是觉得‘说什么都是错，不如不说了’，还是觉得身体里有一股火快要失控了？”';
    } else {
      coreInquiry = '“当争吵发生后丈夫掉头走开或几天不说话时，那种‘被冰封、被晾在一边’的感受，是否比争吵本身更让您感到痛苦和抓狂？”';
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
      behaviorPhenomenon = '<b>【高度紧绷与怕踩雷战备】</b>相处中伴随着谨小慎微的警觉感，生怕哪句话引起对方不悦，家不再是安心卸甲的港湾，反而演变为心理能量的消耗场。';
    } else if (q22 >= 4) {
      behaviorPhenomenon = '<b>【单向委屈与隐性积怨】</b>内心积存了深切的不平衡感，觉得自己在为家庭默不作声地妥协与承担，却得不到伴侣的由衷体恤与肯定。';
    } else if (q20 >= 4) {
      behaviorPhenomenon = '<b>【身在亲密中的深夜孤单】</b>同在一室却缺少心灵回响，日常交往被琐事塞满，深层情感诉求长期处于营养不良状态。';
    } else {
      behaviorPhenomenon = '<b>【安全平稳，松弛感尚有提升空间】</b>具备基本安全感，但日常相处中的轻盈与愉悦体验较平淡。';
    }

    if (q24 >= 4) {
      psychologicalDefense = '<b>【人际创伤雷达的慢性激活】</b>童年或过往经历中对不可预期的情绪爆发形成了高度应激反射，导致神经系统在婚姻中长期处于战备警戒。';
    } else if (q22 >= 4) {
      psychologicalDefense = '<b>【过度付出者的隐性投射】</b>习惯默默承担一切并期待伴侣“主动猜中心思”，一旦期待落空便转为内伤或无名烦躁。';
    } else {
      psychologicalDefense = '<b>【情感表达的自我压抑】</b>习惯将家庭责任置于个人感受之上，长期忽略自身的真实心理负荷。';
    }

    breakAction = '为自己划定界限，当感到心力交瘁时<b>允许自己休息 15 分钟</b>，平静向伴侣说出自己的疲惫与具体需要，而不是一边勉强支撑一边在心底压抑怨气。';

    if (isHusband) {
      coreInquiry = '“在一天忙碌工作之后回到家，推开家门那一瞬间，您身体的感觉是‘终于可以卸下防备歇口气了’，还是会下意识地先察看一下家里的气氛和脸色？”';
    } else {
      coreInquiry = '“在日复一日的家庭与孩子琐事中，您是否常常感到自己是一台停不下来的机器，一旦停下就会被无数琐事追赶，却很少有人真正关心您累不累？”';
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
      behaviorPhenomenon = '<b>【功能性契约与责任妥协】</b>作答明确显示：维持现状在很大程度上被归因于现实责任或子女，对当初的选择产生犹豫，内心呈现出倦怠与心理撤离。';
    } else if (score < 50) {
      behaviorPhenomenon = '<b>【累积性挫败引发的泛化怀疑】</b>多个领域的具体挫折未获有效疏导，导致对整段婚姻的幸福信念产生了动摇与无力感。';
    } else {
      behaviorPhenomenon = '<b>【满意度基底坚固，缺乏凝聚愿景】</b>大体满意目前生活，但缺乏能够共同向往与激发激情的新发展愿景。';
    }

    if (q30 >= 4) {
      psychologicalDefense = '<b>【防御性心理降级】</b>因反复渴望落空而启动的情感断开机制，通过将婚姻降格为单纯的“责任履约”，防止自己的内心继续受到情感伤害。';
    } else {
      psychologicalDefense = '<b>【消极认知滤镜的渗透】</b>容易放大伴侣生活细节中的瑕疵，而忽略了彼此在漫长岁月里共同撑起家庭的踏实贡献。';
    }

    breakAction = '在本周内挑一个轻松时刻，<b>由衷肯定伴侣近期为家庭做出的 1 件具体小事</b>，打破只在问题出现时才关注伴侣的消极惯性。';

    if (isHusband) {
      coreInquiry = '“如果婚姻有一次重新呼吸、减轻负荷的机会，您最渴望妻子在哪个方面给予您更多的认可和肯定？”';
    } else {
      coreInquiry = '“如果在当前的婚姻生活中哪怕只能改变一个小小的现状，您最希望发生的一个具体转变是什么？”';
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
      behaviorPhenomenon = '<b>【二人专属时光的严重剥离】</b>生活完全被工作、育儿与家务填满。当夫妻退化为单纯的“家政与育儿合伙人”，缺少情感能量补给，日常协作极易滋生烦躁。';
    } else if (q34 >= 4) {
      behaviorPhenomenon = '<b>【家务与育儿细节的隐性内耗】</b>在日常琐碎事务的承担上摩擦频繁，操心规划与被动执行之间的步调失衡带来疲惫。';
    } else {
      behaviorPhenomenon = '<b>【功能框架完整，微小边界需理顺】</b>生活协同底盘稳固，但在关键事务决策或精力分配上仍有优化空间。';
    }

    if (q33 <= 2) {
      psychologicalDefense = '<b>【代际边界渗透与首要同盟动摇】</b>长辈或原生家庭意见对核心家庭产生了牵绊，夫妻间未形成排他的“第一同盟”，导致家庭抵御外界压力的能力受损。';
    } else if (q34 >= 4) {
      psychologicalDefense = '<b>【隐性脑力负荷（Mental Load）失衡】</b>矛盾核心往往不仅是“谁动手干活”，而是“谁在操心统筹”，隐性责任的不对称容易诱发被压垮的委屈感。';
    } else {
      psychologicalDefense = '<b>【实用主义对浪漫情感的吞噬】</b>误以为婚姻进入稳定期便不再需要经营仪式感，导致生活机制化、枯燥化。';
    }

    breakAction = '在本周末协调出至少 <b>1 小时的“绝对二人散步时光”</b>，暂时安顿好工作与孩子，两人喝杯咖啡或走一走，坚决不聊柴米油盐与家庭开销。';

    if (isHusband) {
      coreInquiry = '“对于家务和育儿的具体分工，您内心的真实困惑是‘总觉得自己不管做什么好像都达不到妻子的标准，经常挨说’，还是有其他具体考量？”';
    } else {
      coreInquiry = '“在日常家庭运转中，那些看不见但极耗心力的操心事（如孩子学业、老人健康、琐事统筹），是否几乎全压在您一个人的脑子里，而丈夫往往只是被动‘拨一下动一下’？”';
    }
  }

  return {
    score,
    levelText,
    levelColor,
    behaviorPhenomenon,
    psychologicalDefense,
    breakAction,
    coreInquiry
  };
}

// 严谨动态提炼关系守护基石（只提炼得分 ≥ 4 的真正优势项，坚决拒绝虚假硬夸）
function extractRelationshipStrengths(ans) {
  const strengths = [];

  // Q15: 发生分歧聚焦事情人品 (正向题，≥4 分才算优势)
  if (ans[15] >= 4) {
    strengths.push({
      title: '不攻击彼此人品，恪守尊重底线',
      qid: 15,
      score: ans[15],
      desc: '在发生分歧时依然能够努力聚焦具体事情，没有陷入毁灭性的“轻蔑与人格侮辱”，表明双方心底深处对彼此依然保留着做人底线的敬意。'
    });
  }

  // Q18: 激烈争吵时不提离婚分开 (反向题，raw <= 2 则反向健康分为 >= 4 分)
  if (ans[18] <= 2) {
    strengths.push({
      title: '留在关系里的承诺感依然坚定',
      qid: 18,
      score: 6 - ans[18],
      desc: '即使争端激烈、内心倍感痛苦，依然较少产生轻言放弃或拆伙离婚的念头，表明婚姻的“承诺锚点”相当坚实，双方都在竭尽全力守住这个家。'
    });
  }

  // Q33: 原生家庭界限清晰同盟 (正向题，≥4 分)
  if (ans[33] >= 4) {
    strengths.push({
      title: '清晰的原生家庭界限与夫妻同盟',
      qid: 33,
      score: ans[33],
      desc: '在面对双方父母长辈及亲友外部关系时，能够建立起相对健康的“夫妻同盟”屏障，没有因外界宗族或长辈干预造成核心家庭的撕裂。'
    });
  }

  // Q36: 重大决策达成共识 (反向题，raw <= 2 则反向健康分为 >= 4 分)
  if (ans[36] <= 2) {
    strengths.push({
      title: '重大发展方向与底盘大局观高度同频',
      qid: 36,
      score: 6 - ans[36],
      desc: '在家庭大方向、置业、财务或重要人生转折上，仍具备达成现实共识的能力，这是漫长岁月航行中极其不可多得的压舱石。'
    });
  }

  // Q31: 财务管理互信良好 (正向题，≥4 分)
  if (ans[31] >= 4) {
    strengths.push({
      title: '家庭财务互信与开支透明度良好',
      qid: 31,
      score: ans[31],
      desc: '在经济安全感和财务安排上保有基本互信，有效规避了亲密关系中最具杀伤力的金钱猜忌。'
    });
  }

  // Q11: 观点不一致仍尊重立场 (正向题，≥4 分)
  if (ans[11] >= 4) {
    strengths.push({
      title: '理性尊重彼此独立立场',
      qid: 11,
      score: ans[11],
      desc: '即使彼此观念不一致，也能表达对彼此立场的尊重，具备珍贵的理智与建设性沟通底色。'
    });
  }

  // Q27: 初心认同 (严谨校验：只有当 Q27 ≥ 4 且 Q30 <= 2 时，才允许生成初心深厚，杜绝前后自相矛盾！)
  if (ans[27] >= 4 && ans[30] <= 2) {
    strengths.push({
      title: '初心情感认同依然深厚',
      qid: 27,
      score: ans[27],
      desc: '即使经历现实风雨与疲惫，骨子里依然认可当年的选择，这段关系的初心依然散发着生命的微光。'
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

    const lx = cx + (radius + 22) * Math.cos(a);
    const ly = cy + (radius + 16) * Math.sin(a);
    const sVal = scoresMap[dims[i].id] || 0;
    labelsSvg += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle" dominant-baseline="central">' + dims[i].name + ' ' + sVal + '分</text>';
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

    var lx = cx + (radius + 24) * Math.cos(a);
    var ly = cy + (radius + 18) * Math.sin(a);
    labelsSvg += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="8.5" font-weight="bold" fill="#334155" text-anchor="middle" dominant-baseline="central">' + dims[i].name + '</text>';
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

  var legend = '<g transform="translate(' + (cx - 65) + ', 12)">' +
    '<circle cx="0" cy="0" r="4" fill="#2563EB"/>' +
    '<text x="7" y="3" font-size="8.5" font-weight="bold" fill="#2563EB">👨 丈夫得分</text>' +
    '<circle cx="68" cy="0" r="4" fill="#BE185D"/>' +
    '<text x="75" y="3" font-size="8.5" font-weight="bold" fill="#BE185D">👩 妻子得分</text>' +
    '</g>';

  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="max-width:100%; height:auto;">' +
    gridSvg + axesSvg + hPoly + wPoly + hDots + wDots + labelsSvg + legend + '</svg>';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { analyzeDimensionClinical, extractRelationshipStrengths, generateRadarSVG, generateDualRadarSVG, getOptionLabel };
}
