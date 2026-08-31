import type { Relationship, RelationType } from '../types';

// Helper: create a chain of parent→child relationships
function lineage(...ids: string[]): Relationship[] {
  const rels: Relationship[] = [];
  for (let i = 0; i < ids.length - 1; i++) {
    rels.push({ source: ids[i], target: ids[i + 1] });
  }
  return rels;
}

// Helper: one parent, many children (optionally typed, e.g. 'descendant' for clan links)
function children(parent: string, kids: string[], type?: RelationType): Relationship[] {
  return kids.map(kid => (type ? { source: parent, target: kid, type } : { source: parent, target: kid }));
}

// Helper: a chain of successive rulers (NOT father→son)
function succession(...ids: string[]): Relationship[] {
  const rels: Relationship[] = [];
  for (let i = 0; i < ids.length - 1; i++) {
    rels.push({ source: ids[i], target: ids[i + 1], type: 'succession' });
  }
  return rels;
}

// Helper: husband → wife/partner
function spouse(husband: string, wife: string): Relationship {
  return { source: husband, target: wife, type: 'spouse' };
}

// Helper: ancestor → descendant with generations omitted/compressed
function descendant(ancestor: string, desc: string): Relationship {
  return { source: ancestor, target: desc, type: 'descendant' };
}

export const allRelationships: Relationship[] = [
  // ============ CHAPTER 1: Adam to Noah ============
  ...lineage('adam', 'seth', 'enosh', 'kenan', 'mahalalel', 'jared', 'enoch', 'methuselah', 'lamech-seth', 'noah'),

  // Noah's three sons
  ...children('noah', ['shem', 'ham', 'japheth']),

  // Japheth's sons
  ...children('japheth', ['gomer-japheth', 'magog', 'madai', 'javan', 'tubal', 'meshech', 'tiras']),
  ...children('gomer-japheth', ['ashkenaz', 'riphath', 'togarmah']),
  ...children('javan', ['elishah', 'tarshish', 'kittim', 'rodanim']),

  // Ham's sons
  ...children('ham', ['cush', 'mizraim', 'put', 'canaan']),
  ...children('cush', ['seba', 'havilah-cush', 'sabta', 'raamah', 'sabteca', 'nimrod']),
  ...children('raamah', ['sheba-cush', 'dedan-cush']),
  ...children('mizraim', ['ludim', 'anamim', 'lehabim', 'naphtuhim', 'pathrusim', 'casluhim', 'caphtorim']),
  ...children('canaan', ['sidon', 'heth', 'jebusites', 'amorites', 'girgashites', 'hivites', 'arkites', 'sinites', 'arvadites', 'zemarites', 'hamathites']),

  // Shem to Abraham
  ...children('shem', ['elam', 'asshur', 'arpachshad', 'lud', 'aram-shem']),
  ...children('aram-shem', ['uz', 'hul', 'gether', 'meshech-aram']),
  ...lineage('arpachshad', 'shelah', 'eber'),
  ...children('eber', ['peleg', 'joktan']),
  ...children('joktan', ['almodad', 'sheleph', 'hazarmaveth', 'jerah', 'hadoram', 'uzal', 'diklah', 'obal', 'abimael', 'sheba-joktan', 'ophir', 'havilah-joktan', 'jobab-joktan']),
  ...lineage('peleg', 'reu', 'serug', 'nahor', 'terah', 'abraham'),

  // Abraham's children
  ...children('abraham', ['isaac', 'ishmael']),
  // Keturah's sons — children of Abraham through Keturah
  spouse('abraham', 'keturah'),
  ...children('keturah', ['zimran', 'jokshan', 'medan', 'midian', 'ishbak', 'shuah']),
  ...children('jokshan', ['sheba-jokshan', 'dedan-jokshan']),
  ...children('midian', ['ephah', 'epher', 'hanoch-midian', 'abida', 'eldaah']),

  // Ishmael's sons
  ...children('ishmael', ['nebaioth', 'kedar', 'adbeel', 'mibsam-ishmael', 'mishma-ishmael', 'dumah', 'massa', 'hadad-ishmael', 'tema', 'jetur', 'naphish', 'kedemah']),

  // Isaac's sons
  ...children('isaac', ['esau', 'jacob']),

  // Esau's sons
  ...children('esau', ['eliphaz-esau', 'reuel-esau', 'jeush-esau', 'jalam', 'korah-esau']),
  ...children('eliphaz-esau', ['teman', 'omar', 'zephi', 'gatam', 'kenaz-esau', 'amalek']),
  ...children('reuel-esau', ['nahath', 'zerah-reuel', 'shammah-reuel', 'mizzah']),

  // Seir / Horites (1 Chr 1:38-42)
  ...children('seir', ['lotan', 'shobal-seir', 'zibeon', 'anah', 'dishon', 'ezer-seir', 'dishan']),
  ...children('lotan', ['hori', 'hemam']),
  { source: 'seir', target: 'timna' }, // Timna was Lotan's sister, i.e. Seir's daughter (Gen 36:22)
  { source: 'timna', target: 'amalek' }, // Timna, concubine of Eliphaz, bore Amalek (Gen 36:12)
  ...children('shobal-seir', ['alvan', 'manahath', 'ebal-shobal', 'shepho', 'onam']),
  ...children('zibeon', ['aiah', 'anah-zibeon']),
  { source: 'anah', target: 'dishon-anah' },
  ...children('dishon', ['hemdan', 'eshban', 'ithran', 'cheran']),
  ...children('ezer-seir', ['bilhan', 'zaavan', 'akan']),
  ...children('dishan', ['uz-dishan', 'aran']),

  // Seir was the original Horite inhabitant of Edom — no blood relation to Esau; linked by land only
  { source: 'esau', target: 'seir', type: 'associated' },

  // Kings of Edom (1 Chr 1:43-50) — successive rulers, explicitly NOT father-son (each has a
  // different father/city, Gen 36:31-39). Anchored under Esau because they reigned over his nation.
  { source: 'esau', target: 'bela-edom', type: 'associated' },
  ...succession('bela-edom', 'jobab-edom', 'husham', 'hadad-edom', 'samlah', 'shaul-edom', 'baal-hanan', 'hadad-edom2'),

  // Chiefs of Edom (1 Chr 1:51-54) — clan chiefs descended from Esau, generations not given
  ...children('esau', ['timna-chief', 'alvah', 'jetheth', 'oholibamah', 'elah-chief', 'pinon', 'kenaz-chief', 'teman-chief', 'mibzar', 'magdiel', 'iram'], 'descendant'),

  // ============ CHAPTER 2: Jacob's sons & Judah's line ============
  ...children('jacob', ['reuben', 'simeon', 'levi', 'judah', 'dan', 'naphtali', 'gad', 'asher', 'issachar', 'zebulun', 'joseph', 'benjamin']),

  // Joseph's sons
  ...children('joseph', ['ephraim-joseph', 'manasseh-joseph']),

  // Judah's line — children through Bath-shua (wife) and Tamar (his widowed daughter-in-law, Gen 38)
  spouse('judah', 'bath-shua'),
  ...children('bath-shua', ['er', 'onan', 'shelah-judah']),
  spouse('judah', 'tamar'),
  ...children('tamar', ['perez', 'zerah-judah']),
  ...children('perez', ['hezron', 'hamul']),
  ...children('hezron', ['ram', 'jerahmeel', 'caleb-hezron']),
  spouse('caleb-hezron', 'azubah-caleb'),
  spouse('caleb-hezron', 'ephrath'),
  ...lineage('ram', 'amminadab', 'nahshon', 'salma'),
  spouse('salma', 'rahab'), // "Salmon the father of Boaz by Rahab" (Matt 1:5)
  { source: 'rahab', target: 'boaz' },
  spouse('boaz', 'ruth'), // Boaz married Ruth (Ruth 4:13)
  { source: 'ruth', target: 'obed' },
  ...lineage('obed', 'jesse'),
  ...children('jesse', ['eliab', 'abinadab-jesse', 'shimea', 'nethanel-jesse', 'raddai', 'ozem', 'david', 'zeruiah', 'abigail-jesse']),
  ...children('zeruiah', ['abishai', 'joab', 'asahel']),
  { source: 'abigail-jesse', target: 'amasa' },

  // ============ CHAPTER 3: David's royal line ============
  // David's wives and their children (1 Chr 3:1-9)
  spouse('david', 'ahinoam'),
  { source: 'ahinoam', target: 'amnon' },
  spouse('david', 'abigail-carmel'),
  { source: 'abigail-carmel', target: 'daniel-david' },
  spouse('david', 'maacah-david'),
  { source: 'maacah-david', target: 'absalom' },
  spouse('david', 'haggith'),
  { source: 'haggith', target: 'adonijah' },
  spouse('david', 'abital'),
  { source: 'abital', target: 'shephatiah-david' },
  spouse('david', 'eglah'),
  { source: 'eglah', target: 'ithream' },
  spouse('david', 'bathsheba'),
  ...children('bathsheba', ['shimea-david', 'shobab', 'nathan-david', 'solomon']),
  // Other sons born in Jerusalem (mothers not specified)
  ...children('david', ['ibhar', 'elishama-david', 'eliphelet-david', 'nogah', 'nepheg', 'japhia', 'elishama-david2', 'eliada', 'eliphelet-david2', 'tamar-david']),

  // Solomon's line — Kings of Judah
  ...lineage('solomon', 'rehoboam', 'abijah-rehoboam', 'asa', 'jehoshaphat', 'joram-king', 'ahaziah-king', 'joash-king', 'amaziah', 'azariah-king', 'jotham', 'ahaz', 'hezekiah', 'manasseh-king', 'amon', 'josiah'),
  ...children('josiah', ['johanan-josiah', 'jehoiakim', 'zedekiah-king', 'shallum-josiah']),
  ...children('jehoiakim', ['jehoiachin', 'zedekiah-jehoiakim']),
  ...children('jehoiachin', ['shealtiel', 'pedaiah', 'malchiram', 'shenazzar', 'jekamiah', 'hoshama', 'nedabiah']),
  { source: 'shealtiel', target: 'zerubbabel' },
  ...children('pedaiah', ['zerubbabel', 'shimei-pedaiah']),
  ...children('zerubbabel', ['meshullam-zerub', 'hananiah-zerub', 'shelomith', 'hashubah', 'ohel', 'berechiah', 'hasadiah', 'jushab-hesed']),
  ...children('hananiah-zerub', ['pelatiah', 'jeshaiah']),
  ...lineage('jeshaiah', 'rephaiah-post', 'arnan', 'obadiah-post', 'shecaniah', 'shemaiah-post'),
  ...children('shemaiah-post', ['hattush', 'igal', 'bariah', 'neariah', 'shaphat-post']),
  ...children('neariah', ['elioenai', 'hizkiah', 'azrikam']),
  ...children('elioenai', ['hodaviah', 'eliashib', 'pelaiah', 'akkub', 'johanan-post', 'delaiah', 'anani']),

  // ============ CHAPTER 4: More Judah & Simeon ============
  descendant('judah', 'jabez'), // a man of Judah's clans; his exact lineage is not given (1 Chr 4:9-10)

  // Simeon's sons
  ...children('simeon', ['nemuel', 'jamin-simeon', 'jarib', 'zerah-simeon', 'shaul-simeon']),

  // ============ CHAPTER 5: Reuben, Gad ============
  ...children('reuben', ['hanoch-reuben', 'pallu', 'hezron-reuben', 'carmi-reuben']),
  descendant('reuben', 'joel-reuben'), // Joel's descent from Reuben is not detailed (1 Chr 5:4)
  ...lineage('joel-reuben', 'shemaiah-reuben', 'gog-reuben', 'shimei-reuben', 'micah-reuben', 'reaiah-reuben', 'baal-reuben', 'beerah'),

  // Gadite leaders in Bashan — descendants of Gad, generations not given (1 Chr 5:11-12)
  descendant('gad', 'joel-gad'),
  descendant('gad', 'shapham'),
  descendant('gad', 'janai'),
  descendant('gad', 'shaphat-gad'),

  // ============ CHAPTER 6: Levi's line ============
  ...children('levi', ['gershon', 'kohath', 'merari']),
  ...children('kohath', ['amram', 'izhar', 'hebron-levi', 'uzziel']),
  ...children('amram', ['aaron', 'moses', 'miriam']),
  ...children('aaron', ['nadab-aaron', 'abihu', 'eleazar-aaron', 'ithamar']),

  // High priestly line
  ...lineage('eleazar-aaron', 'phinehas', 'abishua', 'bukki', 'uzzi-levi', 'zerahiah', 'meraioth', 'amariah-levi', 'ahitub', 'zadok', 'ahimaaz', 'azariah-priest1', 'johanan-priest', 'azariah-temple', 'amariah-priest2', 'ahitub2', 'zadok2', 'shallum-priest', 'hilkiah', 'azariah-priest3', 'seraiah-priest', 'jehozadak'),

  // Temple musicians — each a distant descendant of his Levitical clan head;
  // full generational chains are in 1 Chr 6:33-47 but are compressed here
  descendant('kohath', 'heman-singer'),
  descendant('gershon', 'asaph-singer'),
  descendant('merari', 'ethan-singer'),

  // Gershon's sons
  ...children('gershon', ['libni', 'shimei-gershon']),
  // Merari's sons
  ...children('merari', ['mahli', 'mushi']),

  // ============ CHAPTER 7: Northern tribes ============
  // Issachar
  ...children('issachar', ['tola-issachar', 'puah', 'jashub', 'shimron']),

  // Benjamin brief
  ...children('benjamin', ['bela-benjamin', 'beker-benjamin', 'jediael', 'ashbel', 'aharah', 'nohah', 'rapha-benjamin']),

  // Naphtali
  ...children('naphtali', ['jahziel', 'guni', 'jezer', 'shallum-naphtali']),

  // Manasseh
  { source: 'manasseh-joseph', target: 'machir' },
  { source: 'machir', target: 'gilead-manasseh' },

  // Ephraim
  { source: 'ephraim-joseph', target: 'shuthelah' },
  { source: 'ephraim-joseph', target: 'beriah-ephraim' },
  ...lineage('beriah-ephraim', 'rephah', 'resheph', 'telah', 'tahan', 'ladan', 'ammihud', 'elishama-ephraim', 'nun', 'joshua-nun'),

  // Asher
  ...children('asher', ['imnah', 'ishvah', 'ishvi-asher', 'beriah-asher', 'serah']),

  // ============ CHAPTER 8: Benjamin & Saul ============
  // Shaharaim's wives and children (1 Chr 8:8-11) — Shaharaim was a Benjaminite of unstated descent
  descendant('benjamin', 'shaharaim'),
  spouse('shaharaim', 'hushim-wife'),
  ...children('hushim-wife', ['abitub', 'elpaal']),
  spouse('shaharaim', 'hodesh'),
  ...children('hodesh', ['jobab-shaharaim', 'zibia', 'mesha-shaharaim', 'malcam', 'jeuz', 'sachia', 'mirmah']),

  // Jeiel "father of Gibeon" — a Benjaminite ancestor of Saul; generations to Benjamin not given
  descendant('benjamin', 'jeiel'),
  ...lineage('jeiel', 'ner', 'kish', 'saul'),
  ...children('saul', ['jonathan', 'malchishua', 'abinadab-saul', 'eshbaal']),
  { source: 'jonathan', target: 'merib-baal' },

  // ============ GOSPEL LINEAGES TO JESUS ============

  // Matthew's line: Zerubbabel to Jesus (Matt 1:13-16)
  ...lineage('zerubbabel', 'abiud', 'eliakim-matt', 'azor', 'zadok-matt', 'achim', 'eliud', 'eleazar-matt', 'matthan', 'jacob-matt', 'joseph-mary'),
  spouse('joseph-mary', 'mary'), // "Joseph the husband of Mary, of whom Jesus was born" (Matt 1:16)
  { source: 'mary', target: 'jesus' },

  // Luke's line: Nathan to Shealtiel (Luke 3:27-31)
  ...lineage('nathan-david', 'mattatha', 'menna', 'melea', 'eliakim-luke', 'jonam', 'joseph-luke1', 'judah-luke', 'simeon-luke', 'levi-luke1', 'matthat-luke1', 'jorim', 'eliezer-luke', 'joshua-luke', 'er-luke', 'elmadam', 'cosam', 'addi', 'melchi-luke1', 'neri', 'shealtiel'),

  // Luke's line: Zerubbabel to Joseph (Luke 3:23-27)
  ...lineage('zerubbabel', 'rhesa', 'joanan', 'joda', 'josech', 'semein', 'mattathias-luke1', 'maath', 'naggai', 'esli', 'nahum-luke', 'amos-luke', 'mattathias-luke2', 'joseph-luke2', 'jannai', 'melchi-luke2', 'levi-luke2', 'matthat-luke2', 'heli', 'joseph-mary'),

  // Luke's extra Cainan (LXX insertion)
  { source: 'arpachshad', target: 'cainan-luke' },
  { source: 'cainan-luke', target: 'shelah' },

  // Luke's Arni/Admin variant (parallel to Ram in Chronicles)
  { source: 'hezron', target: 'arni' },
  { source: 'arni', target: 'admin' },
  { source: 'admin', target: 'amminadab' },
];
