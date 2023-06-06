//Version: 20170826
//File: mc.example
//Description: Core functions for Myanmar Calendrical Calculations
//-------------------------------------------------------------------------
//WebSite: https://yan9a.github.io/mcal/
//Myanmar Calendrical Calculations by Cool Emerald is licensed under the
//     Creative Commons Attribution 4.0 International License.
//To view a copy of this license, visit
//    http://creativecommons.org/licenses/by/4.0/.
//  You are free to:
//   Share — copy and redistribute the material in any medium or format
//   Adapt — remix, transform, and build upon the material
//                   for any purpose, even commercially.
//  Under the following terms:
//   Attribution — You may give appropriate credit, provide a link to the license,
//                   but it is not a compulsory requirement.
//-------------------------------------------------------------------------
//Usage example to calculate Myanmar calendar date
// j=w2j(year,month,day); //get julian day number
// M=j2m(j); //get Myanmar date
// Then
//     M.my = Myanmar year
//     M.mm = Myanmar month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
//      Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ]
//     M.mp = [0=waxing, 1=full moon, 2=waning, or 3=new moon]
//     M.d = fortnight day
//Explanation: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

// const myNumbers = require('myanmar-numbers');

var myNumbers = function myanmarNumbers(str, toLanguage) {
	str += "";
	toLanguage = (toLanguage || "en").toLowerCase();

	var replaceNumbers = function(txt) {
	  var numbers = {
		// Myanmar and Shan numbers
		"๐": 0, // Thai zero
		"ဝ": 0, // Myanmar letter "wa" sometimes used as zero
		"၀": 0,
		"၁": 1,
		"၂": 2,
		"၃": 3,
		"၄": 4,
		"၅": 5,
		"၆": 6,
		"၇": 7,
		"၈": 8,
		"၉": 9,
		"႐": 0,
		"႑": 1,
		"႒": 2,
		"႓": 3,
		"႔": 4,
		"႕": 5,
		"႖": 6,
		"႗": 7,
		"႘": 8,
		"႙": 9
	  };

	  var keys = Object.keys(numbers);
	  if (toLanguage === "my") {
		// Myanmar
		for (var n = 2; n <= 11; n++) {
		  var re = new RegExp(numbers[keys[n]] + "", "g");
		  txt = txt.replace(re, keys[n]);
		}
	  } else if (toLanguage === "shan") {
		// Shan numerals - convert any Myanmar numbers to international first
		var txt = myanmarNumbers(txt) + "";
		for (var n = 12; n < keys.length; n++) {
		  var re = new RegExp(numbers[keys[n]] + "", "g");
		  txt = txt.replace(re, keys[n]);
		}
	  } else {
		for (var n = 0; n < keys.length; n++) {
		  // default
		  if (n === 1) {
			txt = txt.replace(/([၁၂၃၄၅၆၇၈၉])ဝ/g, '$10');
			txt = txt.replace(/ဝ([၁၂၃၄၅၆၇၈၉])/g, '0$1');
			while (txt.match(/ဝ(\d)/)) {
			  txt = txt.replace(/ဝ(\d)/g, '0$1');
			}
			while (txt.match(/(\d)ဝ/)) {
			  txt = txt.replace(/(\d)ဝ/g, '$10');
			}
		  } else {
			var re = new RegExp(keys[n], "g");
			txt = txt.replace(re, numbers[keys[n]]);
		  }
		}
	  }
	  return txt;
	};

	var getDateDivider = function(txt) {
	  var dividers = [".","/","-"];
	  for (var r = 0; r < dividers.length; r++) {
		var test = txt.split(dividers[r]);
		if (test.length === 3) {
		  var day = test[0] * 1;
		  var month = test[1] * 1;
		  var year = test[2] * 1;
		  if (day && month && year && !isNaN(day) && !isNaN(month) && !isNaN(year)) {
			if (day < 32 && month < 13 && year < 4000) {
			  return dividers[r];
			}
		  }
		}
	  }
	};

	var numerals = replaceNumbers(str);
	if (isNaN(1 * numerals)) {
	  // check for Date parsing
	  if ((toLanguage === "my" || toLanguage === "shan") && isNaN(1 * str)) {
		try {
		  var d = new Date(str);
		  if (isNaN(d * 1)) {
			throw 'invalid date';
		  }
		  // valid date - output numbers in this order and send for conversion
		  return replaceNumbers([d.getDate(), d.getMonth() + 1, d.getFullYear()].join("."));
		} catch(e) {
		  // not a valid Date or a number - return formatted string
		  return numerals;
		}
	  } else {
		var dateDivider = getDateDivider(numerals);
		if (dateDivider) {
		  var split = numerals.split(dateDivider);
		  var rearranged = [split[1], split[0], split[2]].join(dateDivider);
		  try {
			var d = new Date(rearranged);
			// valid date
			return d;
		  } catch (e) {
			// not a valid Date or a number - return formatted String
			return numerals;
		  }
		} else {
		  // not a Date or a Number - return formatted String
		  return numerals;
		}
	  }
	} else {
	  // return a Number
	  return 1 * numerals;
	}
}

let str = "1234";
console.log(myNumbers);
console.log(myNumbers(str,"my"));
let num = myNumbers.replaceNumbers;
console.log('str and num');
console.log(str+" , "+num);

const monthsEN = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDay = ["စနေ", "တနင်္ဂ‌နွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး","ကြာသာပတေး","သောကြာ"];
const mpDefinations = ["လဆန်း", "လပြည့်", "လပြည့်ကျော်", "လကွယ်"];
const months = ["LeapWaso", "Tagu", "Kason", "Nayon", "Waso", "Wagaung", "Tawthalin", "Thadingyut", "Tazaungmon", "Nadaw", "Pyatho", "Tabodwe", "Tabaung"];
const monthsMM = ["ပဝါဆို", "တန်ခူး", "ကဆုန်", "နယုန်", "ဝါဆို", "ဝါခေါင်", "တော်သလင်း", "သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်", "ပြာသို", "တပို့တွဲ", "တပေါင်း"];


//Thanks to U Aung Zeya for the  historical  data for earlier Myanmar calendar eras
// many of the full moon days and watat years are referred to the list prepared by him
//Era definition
var g_eras=[
//-------------------------------------------------------------------------
//The first era (the era of Myanmar kings: ME1216 and before)
	//Makaranta system 1 (ME 0 - 797)
{
	"eid":1.1,//era id
	"begin":-999,//beginning Myanmar year
	"end":797,//ending Myanmar year
	"WO":-1.1,// watat offset to compensate
	"NM":-1,//number of months to find excess days
	"fme":[[205,1],[246,1],[471,1],[572,-1],[651,1],[653,2],[656,1],[672,1],
		[729,1], [767,-1]],
		//exceptions for full moon days
	"wte":[]//exceptions for watat years
},
	//Makaranta system 2 (ME 798 - 1099)
{
	"eid":1.2,//era id
	"begin":798,//beginning Myanmar year
	"end":1099,//ending Myanmar year
	"WO":-1.1,// watat offset to compensate
	"NM":-1,//number of months to find excess days
	"fme":[[813,-1],[849,-1],[851,-1],[854,-1],[927,-1],[933,-1],[936,-1],
		[938,-1],[949,-1],[952,-1],[963,-1],[968,-1],[1039,-1]],
		//exceptions for full moon days
	"wte":[]//exceptions for watat years
},
//Thandeikta (ME 1100 - 1216)
{
	"eid":1.3,//era id
	"begin":1100,//beginning Myanmar year
	"end":1216,//ending Myanmar year
	"WO":-0.85,// watat offset to compensate
	"NM":-1,//number of months to find excess days
	"fme":[[1120,1],[1126,-1],[1150,1],[1172,-1],[1207,1]],
	//exceptions for full moon days
	"wte":[[1201,1],[1202,0]]//exceptions for watat years
},
//---------------------------------------------------------
//The second era (the era under British colony: 1217 ME - 1311 ME)
{
	"eid":2,//era id
	"begin":1217,//beginning Myanmar year
	"end":1311,//ending Myanmar year
	"WO":-1,// watat offset to compensate
	"NM":4,//number of months to find excess days
	"fme":[[1234,1],[1261,-1]],//exceptions for full moon days
	"wte":[[1263,1],[1264,0]]//exceptions for watat years
},
//---------------------------------------------------------
//The third era (the era after Independence	1312 ME and after)
{
	"eid":3,//era id
	"begin":1312,//beginning Myanmar year
	"end":9999,//ending Myanmar year
	"WO":-0.5,// watat offset to compensate
	"NM":8,//number of months to find excess days
	"fme":[[1377,1]],//exceptions for full moon days
	"wte":[[1344,1],[1345,0]]//exceptions for watat years
}
];
//-------------------------------------------------------------------------
//Check watat (intercalary month)
//input: (my -myanmar year)
//output:  ( watat - intercalary month [1=watat, 0=common]
  //  fm - full moon day of 2nd Waso in jdn [valid for watat years only])
//dependency: chk_exception(my,fm,watat,ei)
function chk_watat(my) {//get data for respective era
	for(var i=g_eras.length-1;i > 0;i--) if(my >= g_eras[i].begin) break;
	var era=g_eras[i]; var NM=era.NM,WO=era.WO;
	var SY=1577917828/4320000; //solar year (365.2587565)
	var LM=1577917828/53433336; //lunar month (29.53058795)
	var MO=1954168.050623; //beginning of 0 ME

	var TA=(SY/12-LM)*(12-NM); //threshold to adjust
	var ed=(SY*(my+3739))%LM; // excess day
	if(ed < TA) ed+=LM;//adjust excess days
	var fm=Math.round(SY*my+MO-ed+4.5*LM+WO);//full moon day of 2nd Waso
	var TW=0,watat=0;//find watat
	if (era.eid >= 2) {//if 2nd era or later find watat based on excess days
		TW=LM-(SY/12-LM)*NM;
		if(ed >= TW) watat=1;
	}
	else {//if 1st era,find watat by 19 years metonic cycle
	//Myanmar year is divided by 19 and there is intercalary month
	//if the remainder is 2,5,7,10,13,15,18
	//https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
		watat=(my*7+2)%19; if (watat < 0) watat+=19;
		watat=Math.floor(watat/12);
	}
	i=bSearch(my,era.wte); if (i >= 0) watat=era.wte[i][1];//correct watat exceptions
	if(watat) {i=bSearch(my,era.fme); if(i >= 0) fm+=era.fme[i][1]; }
	//correct full moon day exceptions
	return {fm:fm,watat:watat};
}
//-------------------------------------------------------------------------
//Check Myanmar Year
//input: (my -myanmar year)
//output:  (myt :year type [0=common, 1=little watat, 2=big watat],
  //tg1 : the 1st day of Tagu as Julian Day Number
  //fm : full moon day of [2nd] Waso as Julian Day Number)
  //werr: watat error
//dependency: chk_watat(my)
function chk_my(my) {
	var yd=0,y1,nd=0,werr=0,fm=0;
	var y2=chk_watat(my); var myt=y2.watat;
	do{ yd++; y1=chk_watat(my-yd);}while(y1.watat==0 && yd < 3);
	if(myt) { nd=(y2.fm-y1.fm)%354; myt=Math.floor(nd/31)+1;
		fm=y2.fm; if(nd!=30 && nd!=31) {werr=1;} }
	else fm=y1.fm+354*yd;
	var tg1=y1.fm+354*yd-102;
	return {myt:myt,tg1:tg1,fm:fm,werr:werr};
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
function j2m(jd) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var jdn,my,yo,dd,myl,mmt,a,b,c,e,f,mm,md,mml,mp,fd,wd;
	jdn=Math.round(jd);//convert jd to jdn
	my=Math.floor((jdn-0.5-MO)/SY);//Myanmar year
	yo=chk_my(my);//check year
	dd=jdn-yo.tg1+1;//day count
	b=Math.floor(yo.myt/2); c=Math.floor(1/(yo.myt+1)); //big wa and common yr
	myl=354+(1-c)*30+b;//year length
	mmt=Math.floor((dd-1)/myl);//month type: Hnaung =1 or Oo = 0
	dd-=mmt*myl; a=Math.floor((dd+423)/512); //adjust day count and threshold
	mm=Math.floor((dd-b*a+c*a*30+29.26)/29.544);//month
	e=Math.floor((mm+12)/16); f=Math.floor((mm+11)/16);
    md=dd-Math.floor(29.544*mm-29.26)-b*e+c*f*30;//day
    mm+=f*3-e*4; mml=30-mm%2;//adjust month and month length
	if(mm==3) mml+=b;//adjust if Nayon in big watat
	mp=Math.floor((md+1)/16)+Math.floor(md/16)+Math.floor(md/mml);
	fd=md-15*Math.floor(md/16);//waxing or waning day
	wd=(jdn+2)%7;//week day
	return {my:my,myt:yo.myt,myl:myl,mm:mm,mmt:mmt,mml:mml,md:md,
		mp:mp,fd:fd,wd:wd};
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
function m2j(my,mm,mmt,mp,fd) {
	var b,c,mml,m1,m2,md,dd;
	yo=chk_my(my);//check year
	b=Math.floor(yo.myt/2); c=(yo.myt==0); //if big watat and common year
	mml=30-mm%2;//month length
	if (mm==3) mml+=b;//adjust if Nayon in big watat
	m1=mp%2; m2=Math.floor(mp/2); md=m1*(15+m2*(mml-15))+(1-m1)*(fd+15*m2);
	mm+=4-Math.floor((mm+15)/16)*4+Math.floor((mm+12)/16);//adjust month
	dd=md+Math.floor(29.544*mm-29.26)-c*Math.floor((mm+11)/16)*30
		+b*Math.floor((mm+12)/16);
	myl=354+(1-c)*30+b;//year length
	dd+=mmt*myl;//adjust day count
	return dd+yo.tg1-1;
}
//-------------------------------------------------------------------------
//Julian date to Western date
//Credit4 Gregorian date: http://pmyers.pcug.org.au/General/JulianDates.htm
//Credit4 Julian Calendar: http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
//input: (jd:julian date,
  // ct:calendar type [Optional argument: 0=english (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second)
function j2w(jd,ct,SG) {
	ct=ct||0; SG=SG||2361222;//Gregorian start in English calendar (1752/Sep/14)
	var j,jf,y,m,d,h,n,s;
	if (ct==2 || (ct==0 && (jd<SG))) {
		var b,c,f,e;
		j=Math.floor(jd+0.5); jf=jd+0.5-j;
		b=j+1524; c=Math.floor((b-122.1)/365.25); f=Math.floor(365.25*c);
		e=Math.floor((b-f)/30.6001); m=(e>13)?(e-13):(e-1);
		d=b-f-Math.floor(30.6001*e); y=m<3?(c-4715):(c-4716);
	}
	else{
		j=Math.floor(jd+0.5); jf=jd+0.5-j; j-=1721119;
		y=Math.floor((4*j-1)/146097); j=4*j-1-146097*y; d=Math.floor(j/4);
		j=Math.floor((4*d+3)/1461); d=4*d+3-1461*j;
		d=Math.floor((d+4)/4); m=Math.floor((5*d-3)/153); d=5*d-3-153*m;
		d=Math.floor((d+5)/5); y=100*y+j;
		if(m<10) {m+=3;}
		else {m-=9; y=y+1;}
	}
	jf*=24; h=Math.floor(jf); jf=(jf-h)*60; n=Math.floor(jf); s=(jf-n)*60;
	return {y:y,m:m,d:d,h:h,n:n,s:s};
}
//-------------------------------------------------------------------------
//Western date to Julian day number
//Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
//input: (y: year, m: month, d: day,
  // ct:calendar type [Optional argument: 0=english (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Julian day number
function w2j(y,m,d,ct,SG) {
	ct=ct||0; SG=SG||2361222;//Gregorian start in English calendar (1752/Sep/14)
	var a=Math.floor((14-m)/12); y=y+4800-a; m=m+(12*a)-3;
	var jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4);
	if (ct==1) jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
	else if (ct==2) jd=jd-32083;
	else {
		jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
		if(jd<SG) {
			jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4)-32083;
			if(jd>SG) jd=SG;
		}
	}
	return jd;
}
//----------------------------------------------------------------------------
//Search first dimension in a 2D array
//input: (k=key,A=array)
//output: (i=index)
function bSearch(k,A) {
	var i=0; var l=0; var u=A.length-1;
	while(u>=l) {
		i=Math.floor((l+u)/2);
		if (A[i][0]>k)  u=i-1;
		else if (A[i][0]<k) l=i+1;
		else return i;
	} return -1;
}

function toMyanmar(d, lang) {
	lang = lang || "mm";

	var dy = w2j(d.getFullYear(),
	  d.getMonth() + 1,
		d.getDate());
	var jsondat = j2m(dy);

	if (lang === "mm") {
		return myNumbers([jsondat.md, monthsMM[jsondat.mm], jsondat.my].join(" "), "my");
	} else {
		return [jsondat.md, months[jsondat.mm] + ",", jsondat.my].join(" ");
	}
}

function toGregorian(txt) {
	var parsed = myNumbers(txt).toLowerCase().replace(/,/g, '').replace(/\s+/g, " ").split(" ");
	if (isNaN(1 * parsed[0]) && !isNaN(1 * parsed[1])) {
		// could be US date order format
		var switched = parsed[0];
		parsed[0] = parsed[1];
		parsed[1] = switched;
	}
	var pickMonth = -1;
	for (var i = 1; i < months.length; i++) {
		if ((parsed[1] === months[i].toLowerCase()) || (parsed[1] === monthsMM[i])) {
			pickMonth = i;
			break;
		}
	}
	var jsondat = j2w(m2j(1 * parsed[2], pickMonth, 1, 0, 1 * parsed[0]));
	return new Date(jsondat.y, jsondat.m - 1, jsondat.d, 12);
	//mmt: month type [1=hnaung, 0=Oo],
  //mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
  //fd: fortnight day [1 to 15])
}

/*
module.exports = {
	toGregorian: toGregorian,
	toMyanmar: toMyanmar,
	months: {
		en: months,
		mm: monthsMM
	}
};
*/
