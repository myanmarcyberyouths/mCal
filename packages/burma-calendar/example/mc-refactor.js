// const data

const monthsMM = ["ပဝါဆို", "တန်ခူး", "ကဆုန်", "နယုန်", "ဝါဆို", "ဝါခေါင်", "တော်သလင်း", "သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်", "ပြာသို", "တပို့တွဲ", "တပေါင်း"];
const monthsEN = ['', 'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'သြဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'];
const mpDefinations = ["လဆန်း", "လပြည့်", "လပြည့်ကျော်", "လကွယ်"];
const weekDay = ["စနေ", "တနင်္ဂ‌နွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသာပတေး", "သောကြာ"];
const nagahleDefination = ['အနောက်', 'မြောက်', 'အရှေ့', 'တောင်'];
const mahaboteDefination = ['ဘင်္ဂ', 'အထွန်း', 'ရာဇာ', 'အဓိပတိ', 'မရဏ', 'သိုက်', 'ပုတိ'];
const nakhatDefination = ['ဘီလူး', 'နတ်', 'လူ'];
const dayDefination = {
    yatyaza: "ကိစ္စ အမျိုးမျိုး ကို ရက်ရာဇာမှာ ပြုလုပ် ဆောင်ရွက်ပါက အောင်မြင်နိုင်တယ် လို့ ဆိုပါတယ်။ မင်္ဂလာ ကိစ္စတွေ ကို ရက်ရာဇာမှာ အဓိက ထားပြီး ပြုလုပ်ကြပါတယ်။",
    pyathada: "ပြဿဒါး နေ့က ပျက်စီးတတ်၏ လို့ ဆိုကြပါတယ်",
    thamanyo: "သမားညို နေ့မှာ ဆုံးရှုံးရတတ်၏ လို့ ဆိုပါတယ်",
    amyeittasote: "ဘယ်ကိစ္စ မဆို အမြိတ္တစုတ် ရက်မှာ ဆောင်ရွက်ရင် ပြဿဒါး၊ ဝါရမိတ္တု၊ ရက်ကြမ်း ဘယ်လောက် အဆိုးကြုံကြုံ ပြီးစီး အောင်မြင်နိုင်တယ်။ အမြိတ္တစုတ် ရက်က ရက်တစ်ရက်ရဲ့ အဆိုး၊ အပြစ် အားလုံး ကြေပျက်စေတယ်။ မကောင်းတဲ့ အခိုက်အညံ့ အားလုံး ဖယ်ရှားပေးတယ် လို့ဆိုပါတယ်",
    warameittugyi: "ဝါရမိတ္တုကြီး နေ့က နှောင့်နှေး ပျက်စီး တတ်၏ လို့ ဆိုပါတယ်",
    warameittunge: "ဝါရမိတ္တုငယ် နေ့က နှောင့်နှေး ပျက်စီး တတ်၏ လို့ ဆိုပါတယ်",
    yatpote: "ရက်ပုပ် က ညစ်နွမ်းတတ်၏ လို့ ဆိုကြပါတယ်",
    thamaphyu: "သမားဖြူ နေ့မှာ ဆုံးရှုံးရတတ်၏ လို့ ဆိုပါတယ်",
    nagapor: "နဂါးပေါ်မှာ တပိုင်းတစ ဖြစ်တတ်၏ လို့ဆိုပါတယ်",
    yatyotema: "ရက်ယုတ်မာ က ညစ်နွမ်းတတ်၏ လို့ ဆိုကြပါတယ်",
    mahayatkyan: "မဟာရက်ကြမ်း ရှောင်ရ၏ လို့ ဆိုပါတယ်",
    shanyat: "ရှမ်းရက် မှာ ရှောင်ရ၏ လို့ ဆိုပါတယ်"
};

//Thanks to U Aung Zeya for the  historical  data for earlier Myanmar calendar eras
// many of the full moon days and watat years are referred to the list prepared by him
//Era definition
var g_eras = [
    //-------------------------------------------------------------------------
    //The first era (the era of Myanmar kings: ME1216 and before)
    //Makaranta system 1 (ME 0 - 797)
    {
        "eid": 1.1,//era id
        "begin": -999,//beginning Myanmar year
        "end": 797,//ending Myanmar year
        "WO": -1.1,// watat offset to compensate
        "NM": -1,//number of months to find excess days
        "fme": [[205, 1], [246, 1], [471, 1], [572, -1], [651, 1], [653, 2], [656, 1], [672, 1],
            [729, 1], [767, -1]],
        //exceptions for full moon days
        "wte": []//exceptions for watat years
    },
    //Makaranta system 2 (ME 798 - 1099)
    {
        "eid": 1.2,//era id
        "begin": 798,//beginning Myanmar year
        "end": 1099,//ending Myanmar year
        "WO": -1.1,// watat offset to compensate
        "NM": -1,//number of months to find excess days
        "fme": [[813, -1], [849, -1], [851, -1], [854, -1], [927, -1], [933, -1], [936, -1],
            [938, -1], [949, -1], [952, -1], [963, -1], [968, -1], [1039, -1]],
        //exceptions for full moon days
        "wte": []//exceptions for watat years
    },
    //Thandeikta (ME 1100 - 1216)
    {
        "eid": 1.3,//era id
        "begin": 1100,//beginning Myanmar year
        "end": 1216,//ending Myanmar year
        "WO": -0.85,// watat offset to compensate
        "NM": -1,//number of months to find excess days
        "fme": [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]],
        //exceptions for full moon days
        "wte": [[1201, 1], [1202, 0]]//exceptions for watat years
    },
    //---------------------------------------------------------
    //The second era (the era under British colony: 1217 ME - 1311 ME)
    {
        "eid": 2,//era id
        "begin": 1217,//beginning Myanmar year
        "end": 1311,//ending Myanmar year
        "WO": -1,// watat offset to compensate
        "NM": 4,//number of months to find excess days
        "fme": [[1234, 1], [1261, -1]],//exceptions for full moon days
        "wte": [[1263, 1], [1264, 0]]//exceptions for watat years
    },
    //---------------------------------------------------------
    //The third era (the era after Independence	1312 ME and after)
    {
        "eid": 3,//era id
        "begin": 1312,//beginning Myanmar year
        "end": 9999,//ending Myanmar year
        "WO": -0.5,// watat offset to compensate
        "NM": 8,//number of months to find excess days
        "fme": [[1377, 1]],//exceptions for full moon days
        "wte": [[1344, 1], [1345, 0]]//exceptions for watat years
    }
];
//-------------------------------------------------------------------------
//Check watat (intercalary month)
//input: (my -myanmar year)
//output:  ( watat - intercalary month [1=watat, 0=common]
//  fm - full moon day of 2nd Waso in jdn [valid for watat years only])
//dependency: chk_exception(my,fm,watat,ei)
// ဝါထပ် / မထပ် စစ်ဆေးခြင်း
function chk_watat(my) {//get data for respective era
    for (var i = g_eras.length - 1; i > 0; i--) if (my >= g_eras[i].begin) break;
    var era = g_eras[i];
    var NM = era.NM, WO = era.WO;
    var SY = 1577917828 / 4320000; //solar year (365.2587565)
    var LM = 1577917828 / 53433336; //lunar month (29.53058795)
    var MO = 1954168.050623; //beginning of 0 ME

    var TA = (SY / 12 - LM) * (12 - NM); //threshold to adjust
    var ed = (SY * (my + 3739)) % LM; // excess day
    if (ed < TA) ed += LM;//adjust excess days
    var fm = Math.round(SY * my + MO - ed + 4.5 * LM + WO);//full moon day of 2nd Waso
    var TW = 0, watat = 0;//find watat
    if (era.eid >= 2) {//if 2nd era or later find watat based on excess days
        TW = LM - (SY / 12 - LM) * NM;
        if (ed >= TW) watat = 1;
    } else {//if 1st era,find watat by 19 years metonic cycle
        //Myanmar year is divided by 19 and there is intercalary month
        //if the remainder is 2,5,7,10,13,15,18
        //https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
        watat = (my * 7 + 2) % 19;
        if (watat < 0) watat += 19;
        watat = Math.floor(watat / 12);
    }
    i = bSearch(my, era.wte);
    if (i >= 0) watat = era.wte[i][1];//correct watat exceptions
    if (watat) {
        i = bSearch(my, era.fme);
        if (i >= 0) fm += era.fme[i][1];
    }
    //correct full moon day exceptions
    return {fm: fm, watat: watat};
}

//-------------------------------------------------------------------------
//Check Myanmar Year
//input: (my -myanmar year)
//output:  (myt :year type [0=common, 1=little watat, 2=big watat],
//tg1 : the 1st day of Tagu as Julian Day Number
//fm : full moon day of [2nd] Waso as Julian Day Number)
//werr: watat error
//dependency: chk_watat(my)
// မြန်မာနှစ် တစ်နှစ်အား စစ်ဆေးခြင်း
function chk_my(my) {
    var yd = 0, y1, nd = 0, werr = 0, fm = 0;
    var y2 = chk_watat(my);
    var myt = y2.watat;
    do {
        yd++;
        y1 = chk_watat(my - yd);
    } while (y1.watat == 0 && yd < 3);
    if (myt) {
        nd = (y2.fm - y1.fm) % 354;
        myt = Math.floor(nd / 31) + 1;
        fm = y2.fm;
        if (nd != 30 && nd != 31) {
            werr = 1;
        }
    } else fm = y1.fm + 354 * yd;
    var tg1 = y1.fm + 354 * yd - 102;
    return {myt: myt, tg1: tg1, fm: fm, werr: werr};
}

//-------------------------------------------------------------------------
//Julian date to Myanmar date
//input: (jd -julian date)
//output:  (my : year,
//myt :year type [0=common, 1=little watat, 2=big watat],
//myl: year length [354, 384, or 385 days],
//mm: month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, Tawthalin=6,
//    Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ],
//mmt: month type [1=hnaung, 0= Oo],
//mml: month length [29 or 30 days],
//md: month day [1 to 30],
//fd: fortnight day [1 to 15],
//mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
//wd: week day [0=sat, 1=sun, ..., 6=fri] )
//dependency: chk_my(my)
// ဂျူလီယန် ရက် မှ မြန်မာ ရက်ပြောင်းလဲခြင်း
function j2m(jd) {
    var SY = 1577917828 / 4320000; //solar year (365.2587565)
    var MO = 1954168.050623; //beginning of 0 ME
    var jdn, my, yo, dd, myl, mmt, a, b, c, e, f, mm, md, mml, mp, fd, wd;
    jdn = Math.round(jd);//convert jd to jdn
    my = Math.floor((jdn - 0.5 - MO) / SY);//Myanmar year
    yo = chk_my(my);//check year
    dd = jdn - yo.tg1 + 1;//day count
    b = Math.floor(yo.myt / 2);
    c = Math.floor(1 / (yo.myt + 1)); //big wa and common yr
    myl = 354 + (1 - c) * 30 + b;//year length
    mmt = Math.floor((dd - 1) / myl);//month type: Hnaung =1 or Oo = 0
    dd -= mmt * myl;
    a = Math.floor((dd + 423) / 512); //adjust day count and threshold
    mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);//month
    e = Math.floor((mm + 12) / 16);
    f = Math.floor((mm + 11) / 16);
    md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;//day
    mm += f * 3 - e * 4;
    mml = 30 - mm % 2;//adjust month and month length
    if (mm == 3) mml += b;//adjust if Nayon in big watat
    mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);
    fd = md - 15 * Math.floor(md / 16);//waxing or waning day
    wd = (jdn + 2) % 7;//week day
    return {
        my: my, myt: yo.myt, myl: myl, mm: mm, mmt: mmt, mml: mml, md: md,
        mp: mp, fd: fd, wd: wd
    };
}

//-------------------------------------------------------------------------
//Myanmar date to Julian date
//input:  (my : year,
//mm: month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, Tawthalin=6,
//    Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ],
//mmt: month type [1=hnaung, 0=Oo], နှောင်းတန်ခူး ၊ ဉီးတန်းခူး
//mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
//fd: fortnight day [1 to 15])
//output: (jd -julian day number)
//dependency: chk_my(my)
// မြန်မာရက်မှ ဂျူလီယန်ရက် ပြောင်းလဲခြင်း
function m2j(my, mm, mmt, mp, fd) {
    var b, c, mml, m1, m2, md, dd;
    yo = chk_my(my);//check year
    b = Math.floor(yo.myt / 2);
    c = (yo.myt == 0); //if big watat and common year
    mml = 30 - mm % 2;//month length
    if (mm == 3) mml += b;//adjust if Nayon in big watat
    m1 = mp % 2;
    m2 = Math.floor(mp / 2);
    md = m1 * (15 + m2 * (mml - 15)) + (1 - m1) * (fd + 15 * m2);
    mm += 4 - Math.floor((mm + 15) / 16) * 4 + Math.floor((mm + 12) / 16);//adjust month
    dd = md + Math.floor(29.544 * mm - 29.26) - c * Math.floor((mm + 11) / 16) * 30
        + b * Math.floor((mm + 12) / 16);
    myl = 354 + (1 - c) * 30 + b;//year length
    dd += mmt * myl;//adjust day count
    return dd + yo.tg1 - 1;
}

//-------------------------------------------------------------------------
//Julian date to Western date
//Credit4 Gregorian date: http://pmyers.pcug.org.au/General/JulianDates.htm
//Credit4 Julian Calendar: http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
//input: (jd:julian date,
// ct:calendar type [Optional argument: 0=english (default), 1=Gregorian, 2=Julian]
// SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second)
// ဂျူလီယန်ရက်မှ အနောက်တိုင်းရက် ပြောင်းလဲခြင်း
function j2w(jd, ct, SG) {
    ct = ct || 0;
    SG = SG || 2361222;//Gregorian start in English calendar (1752/Sep/14)
    var j, jf, y, m, d, h, n, s;
    if (ct == 2 || (ct == 0 && (jd < SG))) {
        var b, c, f, e;
        j = Math.floor(jd + 0.5);
        jf = jd + 0.5 - j;
        b = j + 1524;
        c = Math.floor((b - 122.1) / 365.25);
        f = Math.floor(365.25 * c);
        e = Math.floor((b - f) / 30.6001);
        m = (e > 13) ? (e - 13) : (e - 1);
        d = b - f - Math.floor(30.6001 * e);
        y = m < 3 ? (c - 4715) : (c - 4716);
    } else {
        j = Math.floor(jd + 0.5);
        jf = jd + 0.5 - j;
        j -= 1721119;
        y = Math.floor((4 * j - 1) / 146097);
        j = 4 * j - 1 - 146097 * y;
        d = Math.floor(j / 4);
        j = Math.floor((4 * d + 3) / 1461);
        d = 4 * d + 3 - 1461 * j;
        d = Math.floor((d + 4) / 4);
        m = Math.floor((5 * d - 3) / 153);
        d = 5 * d - 3 - 153 * m;
        d = Math.floor((d + 5) / 5);
        y = 100 * y + j;
        if (m < 10) {
            m += 3;
        } else {
            m -= 9;
            y = y + 1;
        }
    }
    jf *= 24;
    h = Math.floor(jf);
    jf = (jf - h) * 60;
    n = Math.floor(jf);
    s = (jf - n) * 60;
    return {y: y, m: m, d: d, h: h, n: n, s: s};
}

//-------------------------------------------------------------------------
//Western date to Julian day number
//Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
//input: (y: year, m: month, d: day,
// ct:calendar type [Optional argument: 0=english (default), 1=Gregorian, 2=Julian]
// SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Julian day number
// အနောက်တိုင်းရက်မှ ဂျူလီယန်ရက် ပြောင်းလဲခြင်း
function w2j(y, m, d, ct, SG) {
    ct = ct || 0;
    SG = SG || 2361222;//Gregorian start in English calendar (1752/Sep/14)
    var a = Math.floor((14 - m) / 12);
    y = y + 4800 - a;
    m = m + (12 * a) - 3;
    var jd = d + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4);
    if (ct == 1) jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    else if (ct == 2) jd = jd - 32083;
    else {
        jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        if (jd < SG) {
            jd = d + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4) - 32083;
            if (jd > SG) jd = SG;
        }
    }
    return jd;
}

//----------------------------------------------------------------------------
//Search first dimension in a 2D array
//input: (k=key,A=array)
//output: (i=index)
function bSearch(k, A) {
    var i = 0;
    var l = 0;
    var u = A.length - 1;
    while (u >= l) {
        i = Math.floor((l + u) / 2);
        if (A[i][0] > k) u = i - 1;
        else if (A[i][0] < k) l = i + 1;
        else return i;
    }
    return -1;
}


//Checking Astrological days
//input: (mm=month, mml= length of the month,md= day of the month [0-30],
// wd= weekday  [0=sat, 1=sun, ..., 6=fri], my=Myanmar year)
//output: (sabbath, sabbatheve,yatyaza,pyathada,thamanyo,amyeittasote,
// warameittugyi,warameittunge,yatpote,thamaphyu,nagapor,yatyotema,
// mahayatkyan,shanyat,nagahle [0=west, 1=north, 2=east, 3=south],
//  mahabote [0=Binga, 1=Atun, 2=Yaza, 3=Adipati, 4= Marana, 5=Thike, 6=Puti]
// nakhat [0=orc, 1=elf, 2=human])
// More details @ http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
function astro(mm, mml, md, wd, my) {
    var d, sabbath, sabbatheve, yatyaza, pyathada, thamanyo, amyeittasote;
    var warameittugyi, warameittunge, yatpote, thamaphyu, nagapor, yatyotema;
    var mahayatkyan, shanyat, nagahle, m1, wd1, wd2, wda, sya, mahabote;
    if (mm <= 0) mm = 4;//first waso is considered waso
    d = md - 15 * Math.floor(md / 16);//waxing or waning day [0-15]
    sabbath = 0;
    if ((md == 8) || (md == 15) || (md == 23) || (md == mml)) sabbath = 1;
    sabbatheve = 0;
    if ((md == 7) || (md == 14) || (md == 22) || (md == (mml - 1))) sabbatheve = 1;
    yatyaza = 0;
    m1 = mm % 4;
    wd1 = Math.floor(m1 / 2) + 4;
    wd2 = ((1 - Math.floor(m1 / 2)) + m1 % 2) * (1 + 2 * (m1 % 2));
    if ((wd == wd1) || (wd == wd2)) yatyaza = 1;
    pyathada = 0;
    wda = [1, 3, 3, 0, 2, 1, 2];
    if (m1 == wda[wd]) pyathada = 1;
    if ((m1 == 0) && (wd == 4)) pyathada = 2;//afternoon pyathada
    thamanyo = 0;
    m1 = mm - 1 - Math.floor(mm / 9);
    wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
    wd2 = (wd + 7 - wd1) % 7;
    if (wd2 <= 1) thamanyo = 1;
    amyeittasote = 0;
    wda = [5, 8, 3, 7, 2, 4, 1];
    if (d == wda[wd]) amyeittasote = 1;
    warameittugyi = 0;
    wda = [7, 1, 4, 8, 9, 6, 3];
    if (d == wda[wd]) warameittugyi = 1;
    warameittunge = 0;
    wn = (wd + 6) % 7;
    if ((12 - d) == wn) warameittunge = 1;
    yatpote = 0;
    wda = [8, 1, 4, 6, 9, 8, 7];
    if (d == wda[wd]) yatpote = 1;
    thamaphyu = 0;
    wda = [1, 2, 6, 6, 5, 6, 7];
    if (d == wda[wd]) thamaphyu = 1;
    wda = [0, 1, 0, 0, 0, 3, 3];
    if (d == wda[wd]) thamaphyu = 1;
    if ((d == 4) && (wd == 5)) thamaphyu = 1;
    nagapor = 0;
    wda = [26, 21, 2, 10, 18, 2, 21];
    if (md == wda[wd]) nagapor = 1;
    wda = [17, 19, 1, 0, 9, 0, 0];
    if (md == wda[wd]) nagapor = 1;
    if (((md == 2) && (wd == 1)) || (((md == 12) || (md == 4) || (md == 18)) && (wd == 2))) nagapor = 1;
    yatyotema = 0;
    m1 = (mm % 2) ? mm : ((mm + 9) % 12);
    m1 = (m1 + 4) % 12 + 1;
    if (d == m1) yatyotema = 1;
    mahayatkyan = 0;
    m1 = (Math.floor((mm % 12) / 2) + 4) % 6 + 1;
    if (d == m1) mahayatkyan = 1;
    shanyat = 0;
    sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
    if (d == sya[mm - 1]) shanyat = 1;
    nagahle = Math.floor((mm % 12) / 3);
    mahabote = (my - wd) % 7;
    nakhat = my % 3;

    return {
        sabbath: sabbath, sabbatheve: sabbatheve, yatyaza: yatyaza,
        pyathada: pyathada, thamanyo: thamanyo, amyeittasote: amyeittasote,
        warameittugyi: warameittugyi, warameittunge: warameittunge,
        yatpote: yatpote, thamaphyu: thamaphyu, nagapor: nagapor,
        yatyotema: yatyotema, mahayatkyan: mahayatkyan, shanyat: shanyat,
        nagahle: nagahle, mahabote: mahabote, nakhat: nakhat
    };
}


function သင်္ကြန်ချိတ်တွက်ရန်(မြန်မာခုနှစ်) {
    var SY = 1577917828 / 4320000; //solar year (365.2587565)
    var LM = 1577917828 / 53433336; //lunar month (29.53058795)
    var MO = 1954168.050623; //beginning of 0 ME
    var SE3 = 1312; //beginning of 3rd Era
    ja = SY * မြန်မာခုနှစ် + MO;
    if (မြန်မာခုနှစ် >= SE3) jk = ja - 2.169918982; else jk = ja - 2.1675;
    let သင်္ကြန်ကျချိန် = j2w(jk);
    let သင်္ကြန်တက်ချိန် = j2w(ja);
    let သင်္ကြန်အကြိုနေ့ = j2w(Math.round(jk) - 1);
    let သင်္ကြန်အကျနေ့ = j2w(Math.round(jk));
    let သင်္ကြန်အကြတ်နေ့ = [];
    သင်္ကြန်အကြတ်နေ့[0] = j2w(Math.round(jk) + 1);
    if (Math.round(jk) + 2 != Math.round(ja)) {
        သင်္ကြန်အကြတ်နေ့[1] = j2w(Math.round(jk) + 2);
    }
    let သင်္ကြန်အတက်နေ့ = j2w(Math.round(ja));
    let နှစ်ဆန်းတစ်ရက်နေ့ = j2w(Math.round(ja) + 1);
    return {
        သင်္ကြန်ကျချိန်: သင်္ကြန်ကျချိန်,
        သင်္ကြန်တက်ချိန်: သင်္ကြန်တက်ချိန်,
        သင်္ကြန်အကြိုနေ့: သင်္ကြန်အကြိုနေ့,
        သင်္ကြန်အကျနေ့: သင်္ကြန်အကျနေ့,
        သင်္ကြန်အကြတ်နေ့: သင်္ကြန်အကြတ်နေ့,
        သင်္ကြန်အတက်နေ့: သင်္ကြန်အတက်နေ့,
        နှစ်ဆန်းတစ်ရက်နေ့: နှစ်ဆန်းတစ်ရက်နေ့
    };
}


// English date to Myanmar Date
// input: (year: (int) 2021, month: (int) 1 - 12, date: (int) 1-31 )
// output:
/*
    {
        "year": 1382, // (int) Myanmar Year
        "month": "တပေါင်း", // (String) Myanmar Month
        "moonPhase": "လကွယ်",// (String) Moon Phase
        "date": 15, // (int) Myanmar Month Date ( 1-15)
        "day": "တနင်္ဂ‌နွေ", // (String) Myanmar Day
        "sabbath": "ဉပုဒ်နေ့", // (String) Myanmar Sabbath Day
        "sabbatheve": "",// (String) Myanmar Sabbath Day
        "yatyaza": "ရက်ရာဇာ", // (String) ရက်ရာဇာ
        "pyathada": "", // ပြဿဒါး
        "thamanyo": "", // သမားညို
        "amyeittasote": "", // အမြိတ္တာစုတ်ရက်
        "warameittugyi": "", // ဝါရမိတ္တူကြီး
        "warameittunge": "", // ဝါရ မိတ္တူငယ်
        "yatpote": "", // ရက်ပုတ်
        "thamaphyu": "", // သမားဖြူ
        "nagapor": "", // နဂါးပေါ်
        "yatyotema": "", // ရက်ယုတ်မာ
        "mahayatkyan": "", // မဟာရက်ကြမ်း
        "shanyat": "", // ရှမ်းရက်
        "nagahle": "အနောက်", // နဂါးခေါင်းလှည့်ရာအရပ် [အရှေ့၊ အနောက်၊ တောင်၊ မြောက်]
        "mahabote": "ရာဇာ", // မဟုတ်ဘုတ် ဇာတာခွင်
        "nakhat": "လူ", // နတ်ခက် [ ဘီလူး၊ လူ၊ နတ် ]
        "thingyan": {
            "သင်္ကြန်ကျချိန်": {
                "y": 2021, // သင်္ကြန်ကျချိန် နှစ်
                "m": 4, // သင်္ကြန်ကျချိန် လ
                "d": 14, // သင်္ကြန်ကျချိန် ရက်
                "h": 5, //  သင်္ကြန်ကျချိန် နာရီ
                "n": 46, //  သင်္ကြန်ကျချိန် မိနစ်
                "s": 55.30717313289642 // သင်္ကြန်ကျချိန် စက္ကန့်
            },
            "သင်္ကြန်တက်ချိန်": {
                "y": 2021,
                "m": 4,
                "d": 16,
                "h": 9,
                "n": 51,
                "s": 36.30720466375351
            },
            "သင်္ကြန်အကြိုနေ့": {
                "y": 2021,
                "m": 4,
                "d": 13,
                "h": 12,
                "n": 0,
                "s": 0
            },
            "သင်္ကြန်အကျနေ့": {
                "y": 2021,
                "m": 4,
                "d": 14,
                "h": 12,
                "n": 0,
                "s": 0
            },
            "သင်္ကြန်အကြတ်နေ့": [
                {
                    "y": 2021,
                    "m": 4,
                    "d": 15,
                    "h": 12,
                    "n": 0,
                    "s": 0
                }
            ],
            "သင်္ကြန်အတက်နေ့": {
                "y": 2021,
                "m": 4,
                "d": 16,
                "h": 12,
                "n": 0,
                "s": 0
            },
            "နှစ်ဆန်းတစ်ရက်နေ့": {
                "y": 2021,
                "m": 4,
                "d": 17,
                "h": 12,
                "n": 0,
                "s": 0
            }
        },
        "original": {
            "my": 1382,
            "myt": 1,
            "myl": 384,
            "mm": 12,
            "mmt": 0,
            "mml": 30,
            "md": 30,
            "mp": 3,
            "fd": 15,
            "wd": 1
        },
        "astro": {
            "sabbath": 1,
            "sabbatheve": 0,
            "yatyaza": 1,
            "pyathada": 0,
            "thamanyo": 0,
            "amyeittasote": 0,
            "warameittugyi": 0,
            "warameittunge": 0,
            "yatpote": 0,
            "thamaphyu": 0,
            "nagapor": 0,
            "yatyotema": 0,
            "mahayatkyan": 0,
            "shanyat": 0,
            "nagahle": 0,
            "mahabote": 2,
            "nakhat": 2
        }
    }
*/
function engToMm(year, month, date) {
    let mmDate = {
        year: 0,
        month: '',
        moonPhase: '',
        date: '',
        day: '',
        sabbath: '',
        sabbatheve: '',
        yatyaza: '',
        pyathada: '',
        thamanyo: '',
        amyeittasote: '',
        warameittugyi: '',
        warameittunge: '',
        yatpote: '',
        thamaphyu: '',
        nagapor: '',
        yatyotema: '',
        mahayatkyan: '',
        shanyat: '',
        nagahle: '',
        mahabote: '',
        nakhat: '',
        thingyan: {},
        original: {}
    };
    let j = w2j(year, month, date); //get julian day number
    let M = j2m(j);
    mmDate.thingyan = သင်္ကြန်ချိတ်တွက်ရန်(M.my + 1);
    mmDate.year = M.my; //myNumbers(M.my, "my");
    mmDate.month = monthsMM[M.mm];
    mmDate.moonPhase = mpDefinations[M.mp];
    mmDate.date = M.fd; //myNumbers(M.fd, "my");
    mmDate.day = weekDay[M.wd];

    mmDate.astro = astro(M.mm, M.mml, M.md, M.wd, M.my);
    if (mmDate.astro.sabbath == 1) mmDate.sabbath = 'ဉပုဒ်နေ့';
    if (mmDate.astro.sabbatheve == 1) mmDate.sabbatheve = 'အဖိတ်နေ့';
    if (mmDate.astro.yatyaza == 1) mmDate.yatyaza = 'ရက်ရာဇာ';
    if (mmDate.astro.pyathada == 1) mmDate.pyathada = 'ပြဿဒါး';
    if (mmDate.astro.thamanyo == 1) mmDate.thamanyo = 'သမားညို';
    if (mmDate.astro.amyeittasote == 1) mmDate.amyeittasote = 'အမြိတ္တစုတ်';
    if (mmDate.astro.warameittugyi == 1) mmDate.warameittugyi = 'ဝါရမိတ္တုကြီး';
    if (mmDate.astro.warameittunge == 1) mmDate.warameittunge = 'ဝါရမိတ္တုငယ်';
    if (mmDate.astro.yatpote == 1) mmDate.yatpote = 'ရက်ပုပ်';
    if (mmDate.astro.thamaphyu == 1) mmDate.thamaphyu = 'သမားဖြူ';
    if (mmDate.astro.nagapor == 1) mmDate.nagapor = 'နဂါးပေါ်';
    if (mmDate.astro.yatyotema == 1) mmDate.yatyotema = 'ရက်ယုတ်မာ';
    if (mmDate.astro.mahayatkyan == 1) mmDate.mahayatkyan = 'မဟာရက်ကြမ်း';
    if (mmDate.astro.shanyat == 1) mmDate.shanyat = 'ရှမ်းရက်';
    mmDate.nagahle = nagahleDefination[mmDate.astro.nagahle];
    mmDate.mahabote = mahaboteDefination[mmDate.astro.mahabote];
    mmDate.nakhat = nakhatDefination[mmDate.astro.nakhat];

    mmDate.original = M;
    return mmDate;
}

// Myanmar Date to English Date
// input ( year: (int) Myanmar Year, month: (int) Myanmar Month[0-12], monthType: (int) Myanmar Month Type[0-1], moonPhase: (int) Moon Phase[0-3], date: (int) Myanmar Date[1-15])
// output
/*
    {
        "year": 640,
        "month": "မတ်",
        "date": 12,
        "original": {
            "y": 640,
            "m": 3,
            "d": 12,
            "h": 12,
            "n": 0,
            "s": 0
        }
    }
*/
function mmToEng(year, month, monthType, moonPhase, date) {
    let engDate = {
        year: 0,
        month: '',
        date: '',
        original: {}
    }
    let jDayFromMm = m2j(year, month, monthType, moonPhase, date);
    let westernDate = j2w(jDayFromMm);
    engDate.year = westernDate.y;
    engDate.month = monthsEN[westernDate.m];
    engDate.date = westernDate.d;
    engDate.original = westernDate;
    return engDate;
}


// /*
// module.exports = {
//     toGregorian: toGregorian,
//     toMyanmar: toMyanmar,
//     months: {
//         en: months,
//         mm: monthsMM
//     }
// };
// */


