import type { Person } from '../types';

// ============================================================
// 1 CHRONICLES 1 — Adam to Esau
// ============================================================

// --- 1 Chr 1:1-4  Adam to Noah ---
const ch1_adamToNoah: Person[] = [
  { id: 'adam', name: 'Adam', significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:1', crossReferences: ['Gen 1:26-27', 'Gen 2:7', 'Gen 5:1-5', 'Luke 3:38', 'Rom 5:14', '1 Cor 15:22,45'], roles: ['first man', 'patriarch'], description: 'The first human, created by God. Father of all humanity.' },
  { id: 'seth', name: 'Seth', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:1', crossReferences: ['Gen 4:25-26', 'Gen 5:3-8', 'Luke 3:38'], description: 'Third son of Adam, born after Abel\'s death. His line carried the godly heritage.' },
  { id: 'enosh', name: 'Enosh', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:1', crossReferences: ['Gen 4:26', 'Gen 5:6-11', 'Luke 3:38'], description: 'Son of Seth. In his time, people began to call on the name of the LORD.' },
  { id: 'kenan', name: 'Kenan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:2', crossReferences: ['Gen 5:9-14', 'Luke 3:37'], description: 'Son of Enosh.' },
  { id: 'mahalalel', name: 'Mahalalel', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:2', crossReferences: ['Gen 5:12-17', 'Luke 3:37'], description: 'Son of Kenan.' },
  { id: 'jared', name: 'Jared', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:2', crossReferences: ['Gen 5:15-20', 'Luke 3:37'], description: 'Son of Mahalalel, father of Enoch.' },
  { id: 'enoch', name: 'Enoch', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:3', crossReferences: ['Gen 5:18-24', 'Heb 11:5', 'Jude 1:14-15', 'Luke 3:37'], roles: ['prophet'], description: 'Walked with God and was taken up — he did not see death.' },
  { id: 'methuselah', name: 'Methuselah', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:3', crossReferences: ['Gen 5:21-27', 'Luke 3:37'], description: 'Oldest person in the Bible, lived 969 years.' },
  { id: 'lamech-seth', name: 'Lamech', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:3', crossReferences: ['Gen 5:25-31', 'Luke 3:36'], description: 'Son of Methuselah, father of Noah.' },
  { id: 'noah', name: 'Noah', significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:4', crossReferences: ['Gen 5:28-9:29', 'Matt 24:37-38', 'Luke 3:36', 'Heb 11:7', '1 Pet 3:20', '2 Pet 2:5'], roles: ['patriarch', 'shipbuilder'], description: 'Righteous man who built the ark. God preserved him and his family through the flood.' },
];

// --- 1 Chr 1:5-7  Sons of Japheth ---
const ch1_japheth: Person[] = [
  { id: 'japheth', name: 'Japheth', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:4-5', crossReferences: ['Gen 9:27', 'Gen 10:1-5'], description: 'Son of Noah. Father of European and northern peoples.' },
  { id: 'gomer-japheth', name: 'Gomer', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2-3'], description: 'Son of Japheth.' },
  { id: 'magog', name: 'Magog', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2', 'Ezek 38:2', 'Rev 20:8'], description: 'Son of Japheth. Associated with prophetic nations in Ezekiel and Revelation.' },
  { id: 'madai', name: 'Madai', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2'], description: 'Son of Japheth. Ancestor of the Medes.' },
  { id: 'javan', name: 'Javan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2,4'], description: 'Son of Japheth. Ancestor of the Greeks (Ionians).' },
  { id: 'tubal', name: 'Tubal', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2', 'Ezek 27:13'], description: 'Son of Japheth.' },
  { id: 'meshech', name: 'Meshech', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2', 'Ezek 27:13'], description: 'Son of Japheth.' },
  { id: 'tiras', name: 'Tiras', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:5', crossReferences: ['Gen 10:2'], description: 'Son of Japheth.' },
  // Sons of Gomer
  { id: 'ashkenaz', name: 'Ashkenaz', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:6', crossReferences: ['Gen 10:3'], description: 'Son of Gomer, grandson of Japheth.' },
  { id: 'riphath', name: 'Riphath', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:6', crossReferences: ['Gen 10:3'], description: 'Son of Gomer.' },
  { id: 'togarmah', name: 'Togarmah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:6', crossReferences: ['Gen 10:3', 'Ezek 27:14'], description: 'Son of Gomer.' },
  // Sons of Javan
  { id: 'elishah', name: 'Elishah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:7', crossReferences: ['Gen 10:4'], description: 'Son of Javan.' },
  { id: 'tarshish', name: 'Tarshish', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:7', crossReferences: ['Gen 10:4', 'Isa 23:1', 'Jonah 1:3'], description: 'Son of Javan. Associated with distant maritime trade.' },
  { id: 'kittim', name: 'Kittim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:7', crossReferences: ['Gen 10:4'], description: 'Son of Javan. Associated with Cyprus.' },
  { id: 'rodanim', name: 'Rodanim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:7', crossReferences: ['Gen 10:4'], description: 'Son of Javan.' },
];

// --- 1 Chr 1:8-16  Sons of Ham ---
const ch1_ham: Person[] = [
  { id: 'ham', name: 'Ham', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:4,8', crossReferences: ['Gen 9:18-27', 'Gen 10:6-20'], description: 'Son of Noah. Father of African and Near Eastern peoples.' },
  { id: 'cush', name: 'Cush', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:8', crossReferences: ['Gen 10:6-8'], description: 'Son of Ham. Ancestor of Ethiopian/Nubian peoples.' },
  { id: 'mizraim', name: 'Mizraim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:8', crossReferences: ['Gen 10:6,13-14'], description: 'Son of Ham. Hebrew name for Egypt.' },
  { id: 'put', name: 'Put', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:8', crossReferences: ['Gen 10:6'], description: 'Son of Ham. Associated with Libya.' },
  { id: 'canaan', name: 'Canaan', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:8', crossReferences: ['Gen 9:25-27', 'Gen 10:6,15-19'], description: 'Son of Ham. Ancestor of the Canaanite peoples who inhabited the Promised Land.' },
  // Sons of Cush
  { id: 'seba', name: 'Seba', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Cush.' },
  { id: 'havilah-cush', name: 'Havilah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Cush.' },
  { id: 'sabta', name: 'Sabta', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Cush.' },
  { id: 'raamah', name: 'Raamah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Cush.' },
  { id: 'sabteca', name: 'Sabteca', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Cush.' },
  { id: 'sheba-cush', name: 'Sheba', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Raamah.' },
  { id: 'dedan-cush', name: 'Dedan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:9', crossReferences: ['Gen 10:7'], description: 'Son of Raamah.' },
  { id: 'nimrod', name: 'Nimrod', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:10', crossReferences: ['Gen 10:8-12', 'Mic 5:6'], roles: ['warrior', 'king'], description: 'Mighty warrior and hunter before the LORD. First empire builder — founded Babel, Nineveh.' },
  // Sons of Mizraim (1 Chr 1:11-12)
  { id: 'ludim', name: 'Ludim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:11', crossReferences: ['Gen 10:13'], description: 'Descendant of Mizraim (Egypt).' },
  { id: 'anamim', name: 'Anamim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:11', crossReferences: ['Gen 10:13'], description: 'Descendant of Mizraim.' },
  { id: 'lehabim', name: 'Lehabim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:11', crossReferences: ['Gen 10:13'], description: 'Descendant of Mizraim.' },
  { id: 'naphtuhim', name: 'Naphtuhim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:11', crossReferences: ['Gen 10:13'], description: 'Descendant of Mizraim.' },
  { id: 'pathrusim', name: 'Pathrusim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:12', crossReferences: ['Gen 10:14'], description: 'Descendant of Mizraim.' },
  { id: 'casluhim', name: 'Casluhim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:12', crossReferences: ['Gen 10:14'], description: 'Descendant of Mizraim. From whom the Philistines came.' },
  { id: 'caphtorim', name: 'Caphtorim', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:12', crossReferences: ['Gen 10:14'], description: 'Descendant of Mizraim.' },
  // Sons of Canaan (1 Chr 1:13-16)
  { id: 'sidon', name: 'Sidon', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:13', crossReferences: ['Gen 10:15'], description: 'Firstborn of Canaan. Ancestor of the Sidonians.' },
  { id: 'heth', name: 'Heth', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:13', crossReferences: ['Gen 10:15', 'Gen 23:3-20'], description: 'Son of Canaan. Ancestor of the Hittites.' },
  { id: 'jebusites', name: 'Jebusites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:14', crossReferences: ['Gen 10:16', 'Josh 15:63'], description: 'Descendants of Canaan. Inhabited Jerusalem before David conquered it.' },
  { id: 'amorites', name: 'Amorites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:14', crossReferences: ['Gen 10:16', 'Gen 15:16'], description: 'Descendants of Canaan. Major people group in the Promised Land.' },
  { id: 'girgashites', name: 'Girgashites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:14', crossReferences: ['Gen 10:16'], description: 'Descendants of Canaan.' },
  { id: 'hivites', name: 'Hivites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:15', crossReferences: ['Gen 10:17'], description: 'Descendants of Canaan.' },
  { id: 'arkites', name: 'Arkites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:15', crossReferences: ['Gen 10:17'], description: 'Descendants of Canaan.' },
  { id: 'sinites', name: 'Sinites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:15', crossReferences: ['Gen 10:17'], description: 'Descendants of Canaan.' },
  { id: 'arvadites', name: 'Arvadites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:16', crossReferences: ['Gen 10:18'], description: 'Descendants of Canaan.' },
  { id: 'zemarites', name: 'Zemarites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:16', crossReferences: ['Gen 10:18'], description: 'Descendants of Canaan.' },
  { id: 'hamathites', name: 'Hamathites', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:16', crossReferences: ['Gen 10:18'], description: 'Descendants of Canaan.' },
];

// --- 1 Chr 1:17-27  Sons of Shem to Abraham ---
const ch1_shem: Person[] = [
  { id: 'shem', name: 'Shem', significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:4,17', crossReferences: ['Gen 9:23-27', 'Gen 10:21-31', 'Gen 11:10-26', 'Luke 3:36'], description: 'Son of Noah. Father of the Semitic peoples, through whom came Abraham and Israel.' },
  { id: 'elam', name: 'Elam', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:22'], description: 'Son of Shem. Ancestor of the Elamites (Persia).' },
  { id: 'asshur', name: 'Asshur', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:22'], description: 'Son of Shem. Ancestor of the Assyrians.' },
  { id: 'arpachshad', name: 'Arpachshad', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:22', 'Gen 11:10-13', 'Luke 3:36'], description: 'Son of Shem. In the direct line to Abraham.' },
  { id: 'lud', name: 'Lud', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:22'], description: 'Son of Shem.' },
  { id: 'aram-shem', name: 'Aram', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:22-23'], description: 'Son of Shem. Ancestor of the Arameans (Syrians).' },
  // Sons of Aram (1 Chr 1:17 / Gen 10:23)
  { id: 'uz', name: 'Uz', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:23', 'Job 1:1'], description: 'Son of Aram. The land of Uz is where Job lived.' },
  { id: 'hul', name: 'Hul', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:23'], description: 'Son of Aram.' },
  { id: 'gether', name: 'Gether', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:23'], description: 'Son of Aram.' },
  { id: 'meshech-aram', name: 'Meshech', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:17', crossReferences: ['Gen 10:23'], description: 'Son of Aram (distinct from Meshech son of Japheth).' },
  { id: 'shelah', name: 'Shelah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:18', crossReferences: ['Gen 10:24', 'Gen 11:12-15', 'Luke 3:35'], description: 'Son of Arpachshad.' },
  { id: 'eber', name: 'Eber', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:18', crossReferences: ['Gen 10:21,24-25', 'Gen 11:14-17', 'Luke 3:35'], description: 'Son of Shelah. The name "Hebrew" may derive from Eber.' },
  { id: 'peleg', name: 'Peleg', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:19', crossReferences: ['Gen 10:25', 'Gen 11:16-19', 'Luke 3:35'], description: 'Son of Eber. "In his days the earth was divided."' },
  { id: 'joktan', name: 'Joktan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:19', crossReferences: ['Gen 10:25-30'], description: 'Son of Eber, brother of Peleg. Father of Arabian peoples.' },
  // Sons of Joktan (1 Chr 1:20-23)
  { id: 'almodad', name: 'Almodad', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:20', crossReferences: ['Gen 10:26'], description: 'Son of Joktan.' },
  { id: 'sheleph', name: 'Sheleph', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:20', crossReferences: ['Gen 10:26'], description: 'Son of Joktan.' },
  { id: 'hazarmaveth', name: 'Hazarmaveth', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:20', crossReferences: ['Gen 10:26'], description: 'Son of Joktan.' },
  { id: 'jerah', name: 'Jerah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:20', crossReferences: ['Gen 10:26'], description: 'Son of Joktan.' },
  { id: 'hadoram', name: 'Hadoram', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:21', crossReferences: ['Gen 10:27'], description: 'Son of Joktan.' },
  { id: 'uzal', name: 'Uzal', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:21', crossReferences: ['Gen 10:27'], description: 'Son of Joktan.' },
  { id: 'diklah', name: 'Diklah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:21', crossReferences: ['Gen 10:27'], description: 'Son of Joktan.' },
  { id: 'obal', name: 'Obal', alternateNames: ['Ebal'], significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:22', crossReferences: ['Gen 10:28'], description: 'Son of Joktan.' },
  { id: 'abimael', name: 'Abimael', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:22', crossReferences: ['Gen 10:28'], description: 'Son of Joktan.' },
  { id: 'sheba-joktan', name: 'Sheba', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:22', crossReferences: ['Gen 10:28'], description: 'Son of Joktan.' },
  { id: 'ophir', name: 'Ophir', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:23', crossReferences: ['Gen 10:29', '1 Kgs 9:28'], description: 'Son of Joktan. Associated with a land of gold.' },
  { id: 'havilah-joktan', name: 'Havilah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:23', crossReferences: ['Gen 10:29'], description: 'Son of Joktan.' },
  { id: 'jobab-joktan', name: 'Jobab', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:23', crossReferences: ['Gen 10:29'], description: 'Son of Joktan.' },
  { id: 'reu', name: 'Reu', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:25', crossReferences: ['Gen 11:18-21', 'Luke 3:35'], description: 'Son of Peleg.' },
  { id: 'serug', name: 'Serug', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:26', crossReferences: ['Gen 11:20-23', 'Luke 3:35'], description: 'Son of Reu.' },
  { id: 'nahor', name: 'Nahor', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:26', crossReferences: ['Gen 11:22-25', 'Luke 3:34'], description: 'Son of Serug, grandfather of Abraham.' },
  { id: 'terah', name: 'Terah', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 1:26', crossReferences: ['Gen 11:24-32', 'Josh 24:2', 'Luke 3:34'], description: 'Father of Abraham. Began the journey from Ur toward Canaan.' },
  { id: 'abraham', name: 'Abraham', alternateNames: ['Abram'], significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 1:27', crossReferences: ['Gen 12-25', 'Matt 1:1-2', 'Rom 4:1-25', 'Gal 3:6-9', 'Heb 11:8-19', 'Luke 3:34'], roles: ['patriarch', 'father of faith'], description: 'Father of the Jewish nation. God made a covenant with him promising land, descendants, and blessing to all nations.' },
];

// --- 1 Chr 1:28-33  Abraham's sons (Isaac, Ishmael, Keturah's sons) ---
const ch1_abraham: Person[] = [
  { id: 'isaac', name: 'Isaac', significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 1:28', crossReferences: ['Gen 17:19', 'Gen 21-27', 'Matt 1:2', 'Rom 9:7', 'Heb 11:17-20', 'Luke 3:34'], roles: ['patriarch'], description: 'Son of promise born to Abraham and Sarah. Offered on Mount Moriah. Father of Jacob and Esau.' },
  { id: 'ishmael', name: 'Ishmael', significance: 'notable', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:28-31', crossReferences: ['Gen 16:11-16', 'Gen 17:20', 'Gen 21:9-21', 'Gen 25:12-18', 'Gal 4:22-31'], description: 'Son of Abraham by Hagar. Father of twelve princes and the Ishmaelite peoples.' },
  // Sons of Ishmael (1 Chr 1:29-31)
  { id: 'nebaioth', name: 'Nebaioth', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:29', crossReferences: ['Gen 25:13', 'Isa 60:7'], description: 'Firstborn of Ishmael.' },
  { id: 'kedar', name: 'Kedar', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:29', crossReferences: ['Gen 25:13', 'Isa 21:16-17', 'Song 1:5'], description: 'Son of Ishmael. His descendants were notable nomadic people.' },
  { id: 'adbeel', name: 'Adbeel', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:29', crossReferences: ['Gen 25:13'], description: 'Son of Ishmael.' },
  { id: 'mibsam-ishmael', name: 'Mibsam', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:29', crossReferences: ['Gen 25:13'], description: 'Son of Ishmael.' },
  { id: 'mishma-ishmael', name: 'Mishma', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:30', crossReferences: ['Gen 25:14'], description: 'Son of Ishmael.' },
  { id: 'dumah', name: 'Dumah', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:30', crossReferences: ['Gen 25:14'], description: 'Son of Ishmael.' },
  { id: 'massa', name: 'Massa', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:30', crossReferences: ['Gen 25:14'], description: 'Son of Ishmael.' },
  { id: 'hadad-ishmael', name: 'Hadad', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:30', crossReferences: ['Gen 25:15'], description: 'Son of Ishmael.' },
  { id: 'tema', name: 'Tema', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:30', crossReferences: ['Gen 25:15'], description: 'Son of Ishmael.' },
  { id: 'jetur', name: 'Jetur', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:31', crossReferences: ['Gen 25:15'], description: 'Son of Ishmael.' },
  { id: 'naphish', name: 'Naphish', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:31', crossReferences: ['Gen 25:15'], description: 'Son of Ishmael.' },
  { id: 'kedemah', name: 'Kedemah', significance: 'minor', tribe: 'ishmael', sources: ['1chr'], chroniclesRef: '1 Chr 1:31', crossReferences: ['Gen 25:15'], description: 'Son of Ishmael.' },
  // Sons of Keturah (1 Chr 1:32-33)
  { id: 'keturah', name: 'Keturah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:1-4'], gender: 'female', description: 'Abraham\'s wife after Sarah (Gen 25:1), called his concubine in 1 Chr 1:32. Mother of six sons.' },
  { id: 'zimran', name: 'Zimran', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2'], description: 'Son of Abraham by Keturah.' },
  { id: 'jokshan', name: 'Jokshan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2-3'], description: 'Son of Abraham by Keturah.' },
  { id: 'medan', name: 'Medan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2'], description: 'Son of Abraham by Keturah.' },
  { id: 'midian', name: 'Midian', significance: 'notable', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2,4', 'Exod 2:15-22', 'Judg 6-8'], description: 'Son of Abraham by Keturah. Father of the Midianites — Moses lived among them.' },
  { id: 'ishbak', name: 'Ishbak', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2'], description: 'Son of Abraham by Keturah.' },
  { id: 'shuah', name: 'Shuah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:2'], description: 'Son of Abraham by Keturah.' },
  // Sons of Jokshan (1 Chr 1:32)
  { id: 'sheba-jokshan', name: 'Sheba', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:3'], description: 'Son of Jokshan, grandson of Abraham by Keturah.' },
  { id: 'dedan-jokshan', name: 'Dedan', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:32', crossReferences: ['Gen 25:3'], description: 'Son of Jokshan, grandson of Abraham by Keturah.' },
  // Sons of Midian (1 Chr 1:33)
  { id: 'ephah', name: 'Ephah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:33', crossReferences: ['Gen 25:4', 'Isa 60:6'], description: 'Son of Midian.' },
  { id: 'epher', name: 'Epher', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:33', crossReferences: ['Gen 25:4'], description: 'Son of Midian.' },
  { id: 'hanoch-midian', name: 'Hanoch', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:33', crossReferences: ['Gen 25:4'], description: 'Son of Midian.' },
  { id: 'abida', name: 'Abida', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:33', crossReferences: ['Gen 25:4'], description: 'Son of Midian.' },
  { id: 'eldaah', name: 'Eldaah', significance: 'minor', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 1:33', crossReferences: ['Gen 25:4'], description: 'Son of Midian.' },
];

// --- 1 Chr 1:34-54  Isaac, Esau/Edom ---
const ch1_esau: Person[] = [
  { id: 'esau', name: 'Esau', alternateNames: ['Edom'], significance: 'notable', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:34-35', crossReferences: ['Gen 25:19-34', 'Gen 27', 'Gen 32-33', 'Mal 1:2-3', 'Rom 9:13', 'Heb 12:16-17'], description: 'Firstborn twin of Isaac, sold his birthright to Jacob. Father of the Edomites.' },
  { id: 'jacob', name: 'Jacob', alternateNames: ['Israel'], significance: 'major', tribe: 'pre-tribal', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 1:34', crossReferences: ['Gen 25-50', 'Matt 1:2', 'Luke 3:34', 'Rom 9:13'], roles: ['patriarch'], description: 'Son of Isaac, renamed Israel by God. Father of the twelve tribes.' },
  // Sons of Esau (1 Chr 1:35-37)
  { id: 'eliphaz-esau', name: 'Eliphaz', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:35', crossReferences: ['Gen 36:4,10-12'], description: 'Firstborn of Esau.' },
  { id: 'reuel-esau', name: 'Reuel', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:35', crossReferences: ['Gen 36:4,13'], description: 'Son of Esau.' },
  { id: 'jeush-esau', name: 'Jeush', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:35', crossReferences: ['Gen 36:5'], description: 'Son of Esau.' },
  { id: 'jalam', name: 'Jalam', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:35', crossReferences: ['Gen 36:5'], description: 'Son of Esau.' },
  { id: 'korah-esau', name: 'Korah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:35', crossReferences: ['Gen 36:5'], description: 'Son of Esau (not to be confused with Korah the Levite).' },
  { id: 'teman', name: 'Teman', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:11', 'Jer 49:7'], description: 'Son of Eliphaz. Known for wisdom (the Temanites).' },
  { id: 'omar', name: 'Omar', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:11'], description: 'Son of Eliphaz.' },
  { id: 'zephi', name: 'Zephi', alternateNames: ['Zepho'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:11'], description: 'Son of Eliphaz.' },
  { id: 'gatam', name: 'Gatam', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:11'], description: 'Son of Eliphaz.' },
  { id: 'kenaz-esau', name: 'Kenaz', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:11'], description: 'Son of Eliphaz.' },
  { id: 'amalek', name: 'Amalek', significance: 'notable', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:36', crossReferences: ['Gen 36:12', 'Exod 17:8-16', '1 Sam 15'], description: 'Son of Eliphaz by Timna. His descendants became Israel\'s perpetual enemy.' },
  // Sons of Reuel (1 Chr 1:37)
  { id: 'nahath', name: 'Nahath', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:37', crossReferences: ['Gen 36:13'], description: 'Son of Reuel, grandson of Esau.' },
  { id: 'zerah-reuel', name: 'Zerah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:37', crossReferences: ['Gen 36:13'], description: 'Son of Reuel, grandson of Esau.' },
  { id: 'shammah-reuel', name: 'Shammah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:37', crossReferences: ['Gen 36:13'], description: 'Son of Reuel, grandson of Esau.' },
  { id: 'mizzah', name: 'Mizzah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:37', crossReferences: ['Gen 36:13'], description: 'Son of Reuel, grandson of Esau.' },
  // Sons of Seir / Horites (1 Chr 1:38-42)
  { id: 'seir', name: 'Seir', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20-30'], description: 'The Horite, original inhabitant of the land of Edom.' },
  { id: 'lotan', name: 'Lotan', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,22'], description: 'Son of Seir the Horite.' },
  { id: 'shobal-seir', name: 'Shobal', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,23'], description: 'Son of Seir the Horite.' },
  { id: 'zibeon', name: 'Zibeon', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,24'], description: 'Son of Seir the Horite.' },
  { id: 'anah', name: 'Anah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,25'], description: 'Son of Seir the Horite.' },
  { id: 'dishon', name: 'Dishon', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,25-26'], description: 'Son of Seir the Horite.' },
  { id: 'ezer-seir', name: 'Ezer', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,27'], description: 'Son of Seir the Horite.' },
  { id: 'dishan', name: 'Dishan', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:38', crossReferences: ['Gen 36:20,28'], description: 'Son of Seir the Horite.' },
  // Sons of Lotan (1 Chr 1:39)
  { id: 'hori', name: 'Hori', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:39', crossReferences: ['Gen 36:22'], description: 'Son of Lotan.' },
  { id: 'hemam', name: 'Hemam', alternateNames: ['Homam'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:39', crossReferences: ['Gen 36:22'], description: 'Son of Lotan.' },
  { id: 'timna', name: 'Timna', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:39', crossReferences: ['Gen 36:12,22'], gender: 'female', description: 'Daughter of Seir, sister of Lotan (Gen 36:22). Concubine of Eliphaz, mother of Amalek (Gen 36:12).' },
  // Sons of Shobal (1 Chr 1:40)
  { id: 'alvan', name: 'Alvan', alternateNames: ['Alian'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:23'], description: 'Son of Shobal.' },
  { id: 'manahath', name: 'Manahath', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:23'], description: 'Son of Shobal.' },
  { id: 'ebal-shobal', name: 'Ebal', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:23'], description: 'Son of Shobal.' },
  { id: 'shepho', name: 'Shepho', alternateNames: ['Shephi'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:23'], description: 'Son of Shobal.' },
  { id: 'onam', name: 'Onam', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:23'], description: 'Son of Shobal.' },
  // Sons of Zibeon (1 Chr 1:40)
  { id: 'aiah', name: 'Aiah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:24'], description: 'Son of Zibeon.' },
  { id: 'anah-zibeon', name: 'Anah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:40', crossReferences: ['Gen 36:24'], description: 'Son of Zibeon.' },
  // Son of Anah (1 Chr 1:41)
  { id: 'dishon-anah', name: 'Dishon', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:41', crossReferences: ['Gen 36:25'], description: 'Son of Anah.' },
  // Sons of Dishon (1 Chr 1:41)
  { id: 'hemdan', name: 'Hemdan', alternateNames: ['Hamran'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:41', crossReferences: ['Gen 36:26'], description: 'Son of Dishon.' },
  { id: 'eshban', name: 'Eshban', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:41', crossReferences: ['Gen 36:26'], description: 'Son of Dishon.' },
  { id: 'ithran', name: 'Ithran', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:41', crossReferences: ['Gen 36:26'], description: 'Son of Dishon.' },
  { id: 'cheran', name: 'Cheran', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:41', crossReferences: ['Gen 36:26'], description: 'Son of Dishon.' },
  // Sons of Ezer (1 Chr 1:42)
  { id: 'bilhan', name: 'Bilhan', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:42', crossReferences: ['Gen 36:27'], description: 'Son of Ezer.' },
  { id: 'zaavan', name: 'Zaavan', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:42', crossReferences: ['Gen 36:27'], description: 'Son of Ezer.' },
  { id: 'akan', name: 'Akan', alternateNames: ['Jaakan'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:42', crossReferences: ['Gen 36:27'], description: 'Son of Ezer.' },
  // Sons of Dishan (1 Chr 1:42)
  { id: 'uz-dishan', name: 'Uz', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:42', crossReferences: ['Gen 36:28'], description: 'Son of Dishan.' },
  { id: 'aran', name: 'Aran', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:42', crossReferences: ['Gen 36:28'], description: 'Son of Dishan.' },
  // Kings of Edom (1 Chr 1:43-50)
  { id: 'bela-edom', name: 'Bela', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:43', crossReferences: ['Gen 36:32'], roles: ['king'], description: 'King of Edom. Son of Beor, from Dinhabah.' },
  { id: 'jobab-edom', name: 'Jobab', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:44', crossReferences: ['Gen 36:33'], roles: ['king'], description: 'King of Edom. Son of Zerah of Bozrah.' },
  { id: 'husham', name: 'Husham', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:45', crossReferences: ['Gen 36:34'], roles: ['king'], description: 'King of Edom, from the land of the Temanites.' },
  { id: 'hadad-edom', name: 'Hadad', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:46', crossReferences: ['Gen 36:35'], roles: ['king'], description: 'King of Edom. Son of Bedad. Defeated Midian in Moab.' },
  { id: 'samlah', name: 'Samlah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:47', crossReferences: ['Gen 36:36'], roles: ['king'], description: 'King of Edom, from Masrekah.' },
  { id: 'shaul-edom', name: 'Shaul', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:48', crossReferences: ['Gen 36:37'], roles: ['king'], description: 'King of Edom, from Rehoboth on the Euphrates.' },
  { id: 'baal-hanan', name: 'Baal-hanan', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:49', crossReferences: ['Gen 36:38'], roles: ['king'], description: 'King of Edom. Son of Achbor.' },
  { id: 'hadad-edom2', name: 'Hadad', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:50', crossReferences: ['Gen 36:39'], roles: ['king'], description: 'King of Edom. His wife was Mehetabel daughter of Matred.' },
  // Chiefs of Edom (1 Chr 1:51-54)
  { id: 'timna-chief', name: 'Timna', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:51', crossReferences: ['Gen 36:40'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'alvah', name: 'Alvah', alternateNames: ['Aliah'], significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:51', crossReferences: ['Gen 36:40'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'jetheth', name: 'Jetheth', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:51', crossReferences: ['Gen 36:40'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'oholibamah', name: 'Oholibamah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:52', crossReferences: ['Gen 36:41'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'elah-chief', name: 'Elah', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:52', crossReferences: ['Gen 36:41'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'pinon', name: 'Pinon', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:52', crossReferences: ['Gen 36:41'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'kenaz-chief', name: 'Kenaz', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:53', crossReferences: ['Gen 36:42'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'teman-chief', name: 'Teman', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:53', crossReferences: ['Gen 36:42'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'mibzar', name: 'Mibzar', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:53', crossReferences: ['Gen 36:42'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'magdiel', name: 'Magdiel', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:54', crossReferences: ['Gen 36:43'], roles: ['chief'], description: 'Chief of Edom.' },
  { id: 'iram', name: 'Iram', significance: 'minor', tribe: 'edom', sources: ['1chr'], chroniclesRef: '1 Chr 1:54', crossReferences: ['Gen 36:43'], roles: ['chief'], description: 'Chief of Edom.' },
];

// ============================================================
// 1 CHRONICLES 2 — Israel's sons and Judah's line
// ============================================================

// --- 1 Chr 2:1-2  The twelve sons of Israel (Jacob) ---
const ch2_sonsOfIsrael: Person[] = [
  { id: 'reuben', name: 'Reuben', significance: 'notable', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 29:32', 'Gen 35:22', 'Gen 49:3-4'], description: 'Firstborn of Jacob by Leah. Lost birthright due to sin with Bilhah.' },
  { id: 'simeon', name: 'Simeon', significance: 'notable', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 29:33', 'Gen 34', 'Gen 49:5-7'], description: 'Second son of Jacob by Leah.' },
  { id: 'levi', name: 'Levi', significance: 'major', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 29:34', 'Gen 34', 'Gen 49:5-7', 'Deut 33:8-11'], roles: ['patriarch'], description: 'Third son of Jacob by Leah. His descendants became the priestly tribe.' },
  { id: 'judah', name: 'Judah', significance: 'major', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 29:35', 'Gen 38', 'Gen 49:8-12', 'Matt 1:2-3', 'Luke 3:33'], roles: ['patriarch'], description: 'Fourth son of Jacob by Leah. The royal tribe — from his line came David and the Messiah.' },
  { id: 'dan', name: 'Dan', significance: 'notable', tribe: 'dan', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 30:5-6', 'Gen 49:16-17'], description: 'Son of Jacob by Bilhah (Rachel\'s servant).' },
  { id: 'naphtali', name: 'Naphtali', significance: 'notable', tribe: 'naphtali', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 30:7-8', 'Gen 49:21'], description: 'Son of Jacob by Bilhah.' },
  { id: 'gad', name: 'Gad', significance: 'notable', tribe: 'gad', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 30:10-11', 'Gen 49:19'], description: 'Son of Jacob by Zilpah (Leah\'s servant).' },
  { id: 'asher', name: 'Asher', significance: 'notable', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 30:12-13', 'Gen 49:20'], description: 'Son of Jacob by Zilpah.' },
  { id: 'issachar', name: 'Issachar', significance: 'notable', tribe: 'issachar', sources: ['1chr'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 30:17-18', 'Gen 49:14-15'], description: 'Son of Jacob by Leah.' },
  { id: 'zebulun', name: 'Zebulun', significance: 'notable', tribe: 'zebulun', sources: ['1chr'], chroniclesRef: '1 Chr 2:1', crossReferences: ['Gen 30:19-20', 'Gen 49:13'], description: 'Son of Jacob by Leah.' },
  { id: 'joseph', name: 'Joseph', significance: 'major', tribe: 'pre-tribal', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 30:22-24', 'Gen 37-50', 'Gen 49:22-26', 'Heb 11:22'], roles: ['patriarch', 'ruler'], description: 'Favorite son of Jacob by Rachel. Sold into slavery, rose to rule Egypt. His sons Ephraim and Manasseh became tribes.' },
  { id: 'benjamin', name: 'Benjamin', significance: 'notable', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 2:2', crossReferences: ['Gen 35:16-18', 'Gen 49:27'], description: 'Youngest son of Jacob by Rachel. Rachel died giving birth to him.' },
];

// --- 1 Chr 2:3-17  Judah through to David ---
const ch2_judahLine: Person[] = [
  // Judah's wives
  { id: 'bath-shua', name: 'Bath-shua', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:3', gender: 'female', description: 'Canaanite wife of Judah. Mother of Er, Onan, and Shelah.' },
  // Judah's sons
  { id: 'er', name: 'Er', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:3', crossReferences: ['Gen 38:3-7'], description: 'Firstborn of Judah. Wicked in the LORD\'s sight; put to death by God.' },
  { id: 'onan', name: 'Onan', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:3', crossReferences: ['Gen 38:4,8-10'], description: 'Second son of Judah. Displeased the LORD and was put to death.' },
  { id: 'shelah-judah', name: 'Shelah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:3', crossReferences: ['Gen 38:5,11,26'], description: 'Third son of Judah by his Canaanite wife.' },
  { id: 'tamar', name: 'Tamar', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 2:4', crossReferences: ['Gen 38:6-30', 'Matt 1:3'], gender: 'female', description: 'Daughter-in-law of Judah. Mother of Perez and Zerah. In the lineage of Christ.' },
  { id: 'perez', name: 'Perez', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:4', crossReferences: ['Gen 38:29', 'Ruth 4:12,18', 'Matt 1:3', 'Luke 3:33'], description: 'Son of Judah and Tamar. In the direct line to David and Christ.' },
  { id: 'zerah-judah', name: 'Zerah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:4', crossReferences: ['Gen 38:30'], description: 'Twin of Perez, son of Judah and Tamar.' },
  // Perez line to David
  { id: 'hezron', name: 'Hezron', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:5', crossReferences: ['Gen 46:12', 'Ruth 4:18', 'Matt 1:3', 'Luke 3:33'], description: 'Son of Perez. Key link in the line to David.' },
  { id: 'hamul', name: 'Hamul', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:5', crossReferences: ['Gen 46:12'], description: 'Son of Perez.' },
  { id: 'ram', name: 'Ram', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 2:9-10', crossReferences: ['Ruth 4:19', 'Matt 1:3-4'], description: 'Son of Hezron. In the direct line to David.' },
  { id: 'jerahmeel', name: 'Jerahmeel', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:9,25-41', crossReferences: ['1 Sam 27:10'], description: 'Firstborn of Hezron. Founded the Jerahmeelite clan.' },
  { id: 'caleb-hezron', name: 'Caleb', alternateNames: ['Chelubai'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:9,18-20,42-50', description: 'Son of Hezron (different from Caleb the spy).' },
  { id: 'azubah-caleb', name: 'Azubah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:18-19', gender: 'female', description: 'First wife of Caleb son of Hezron.' },
  { id: 'ephrath', name: 'Ephrath', alternateNames: ['Ephrathah'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:19', gender: 'female', description: 'Second wife of Caleb son of Hezron. Mother of Hur.' },
  { id: 'amminadab', name: 'Amminadab', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:10', crossReferences: ['Ruth 4:19-20', 'Matt 1:4', 'Luke 3:33'], description: 'Son of Ram.' },
  { id: 'nahshon', name: 'Nahshon', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:10', crossReferences: ['Num 1:7', 'Num 2:3', 'Ruth 4:20', 'Matt 1:4', 'Luke 3:32'], roles: ['leader'], description: 'Son of Amminadab. Leader of Judah during the wilderness wandering.' },
  { id: 'salma', name: 'Salma', alternateNames: ['Salmon'], significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:11', crossReferences: ['Ruth 4:20-21', 'Matt 1:4-5', 'Luke 3:32'], description: 'Son of Nahshon, father of Boaz.' },
  { id: 'rahab', name: 'Rahab', significance: 'notable', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:5', crossReferences: ['Josh 2:1-21', 'Josh 6:22-25', 'Heb 11:31', 'James 2:25'], gender: 'female', roles: ['ancestress of David'], description: 'A Canaanite woman of Jericho who hid Israel\'s spies. By faith she was saved and became an ancestress of David and of Christ.' },
  { id: 'boaz', name: 'Boaz', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:11-12', crossReferences: ['Ruth 2-4', 'Matt 1:5', 'Luke 3:32'], roles: ['kinsman-redeemer'], description: 'Married Ruth the Moabitess. Kinsman-redeemer. Great-grandfather of David.' },
  { id: 'ruth', name: 'Ruth', significance: 'notable', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:5', crossReferences: ['Ruth 1:16-17', 'Ruth 4:13-17'], gender: 'female', roles: ['ancestress of David'], description: 'Moabite woman of great loyalty. "Where you go I will go." Great-grandmother of David. Not named in 1 Chronicles, but honored in Matthew\'s genealogy of Christ.' },
  { id: 'obed', name: 'Obed', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:12', crossReferences: ['Ruth 4:17,21-22', 'Matt 1:5', 'Luke 3:32'], description: 'Son of Boaz and Ruth. Grandfather of David.' },
  { id: 'jesse', name: 'Jesse', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:12-13', crossReferences: ['1 Sam 16:1-13', 'Isa 11:1,10', 'Matt 1:5-6', 'Luke 3:32', 'Acts 13:22'], description: 'Father of David. From Bethlehem. Isaiah prophesied the Messiah as "a shoot from the stump of Jesse" (Isa 11:1).' },
  // Jesse's sons (1 Chr 2:13-16)
  { id: 'eliab', name: 'Eliab', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:13', crossReferences: ['1 Sam 16:6-7', '1 Sam 17:28'], description: 'Firstborn of Jesse. Tall and handsome but not God\'s chosen.' },
  { id: 'abinadab-jesse', name: 'Abinadab', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:13', crossReferences: ['1 Sam 16:8'], description: 'Second son of Jesse.' },
  { id: 'shimea', name: 'Shimea', alternateNames: ['Shammah'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:13', crossReferences: ['1 Sam 16:9'], description: 'Third son of Jesse.' },
  { id: 'nethanel-jesse', name: 'Nethanel', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:14', description: 'Fourth son of Jesse.' },
  { id: 'raddai', name: 'Raddai', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:14', description: 'Fifth son of Jesse.' },
  { id: 'ozem', name: 'Ozem', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:15', description: 'Sixth son of Jesse.' },
  { id: 'david', name: 'David', significance: 'major', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 2:15', crossReferences: ['1 Sam 16-31', '2 Sam', '1 Chr 10-29', 'Psalms', 'Matt 1:1,6', 'Luke 3:31', 'Acts 13:22', 'Rev 22:16'], roles: ['king', 'psalmist', 'warrior', 'prophet'], description: 'Seventh son of Jesse. Shepherd boy who slew Goliath. Greatest king of Israel. "A man after God\'s own heart." Established Jerusalem as capital.' },
  // Jesse's daughters
  { id: 'zeruiah', name: 'Zeruiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:16', crossReferences: ['2 Sam 2:18'], gender: 'female', description: 'Sister of David. Mother of Joab, Abishai, and Asahel — David\'s mighty warriors.' },
  { id: 'abigail-jesse', name: 'Abigail', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:16', crossReferences: ['2 Sam 17:25'], gender: 'female', description: 'Sister of David. Mother of Amasa.' },
  // Sons of Zeruiah and Abigail (1 Chr 2:16-17)
  { id: 'abishai', name: 'Abishai', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:16', crossReferences: ['2 Sam 23:18-19'], roles: ['warrior'], description: 'Son of Zeruiah, David\'s nephew. One of David\'s mighty warriors.' },
  { id: 'joab', name: 'Joab', significance: 'notable', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:16', crossReferences: ['2 Sam 2-20', '1 Kgs 2:28-34'], roles: ['military commander'], description: 'Son of Zeruiah, David\'s nephew. Commander of David\'s army.' },
  { id: 'asahel', name: 'Asahel', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:16', crossReferences: ['2 Sam 2:18-23'], roles: ['warrior'], description: 'Son of Zeruiah, David\'s nephew. Known for his speed.' },
  { id: 'amasa', name: 'Amasa', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 2:17', crossReferences: ['2 Sam 17:25', '2 Sam 19:13'], roles: ['military commander'], description: 'Son of Abigail (David\'s sister). Briefly commanded Absalom\'s army.' },
];

// ============================================================
// 1 CHRONICLES 3 — David's royal line
// ============================================================

const ch3_davidLine: Person[] = [
  // David's wives (1 Chr 3:1-5)
  { id: 'ahinoam', name: 'Ahinoam', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:1', gender: 'female', description: 'Wife of David from Jezreel. Mother of his firstborn Amnon.' },
  { id: 'abigail-carmel', name: 'Abigail', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:1', gender: 'female', description: 'Wife of David from Carmel. Mother of Daniel (Kileab).' },
  { id: 'maacah-david', name: 'Maacah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:2', gender: 'female', description: 'Wife of David. Daughter of Talmai king of Geshur. Mother of Absalom.' },
  { id: 'haggith', name: 'Haggith', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:2', gender: 'female', description: 'Wife of David. Mother of Adonijah.' },
  { id: 'abital', name: 'Abital', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:3', gender: 'female', description: 'Wife of David. Mother of Shephatiah.' },
  { id: 'eglah', name: 'Eglah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:3', gender: 'female', description: 'Wife of David. Mother of Ithream.' },
  // David's sons born in Hebron (1 Chr 3:1-4)
  { id: 'amnon', name: 'Amnon', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:1', crossReferences: ['2 Sam 3:2', '2 Sam 13'], description: 'Firstborn of David, by Ahinoam. Killed by Absalom after violating Tamar.' },
  { id: 'daniel-david', name: 'Daniel', alternateNames: ['Kileab'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:1', crossReferences: ['2 Sam 3:3'], description: 'Second son of David, by Abigail the Carmelitess.' },
  { id: 'absalom', name: 'Absalom', significance: 'notable', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:2', crossReferences: ['2 Sam 3:3', '2 Sam 13-18'], roles: ['prince'], description: 'Third son of David. Famous for his beauty and rebellion. Led a revolt against David.' },
  { id: 'adonijah', name: 'Adonijah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:2', crossReferences: ['2 Sam 3:4', '1 Kgs 1-2'], description: 'Fourth son of David. Tried to seize the throne before Solomon.' },
  { id: 'shephatiah-david', name: 'Shephatiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:3', crossReferences: ['2 Sam 3:4'], description: 'Fifth son of David.' },
  { id: 'ithream', name: 'Ithream', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:3', crossReferences: ['2 Sam 3:5'], description: 'Sixth son of David.' },
  // David's sons born in Jerusalem (1 Chr 3:5-9)
  { id: 'bathsheba', name: 'Bathsheba', alternateNames: ['Bath-shua'], significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:5', crossReferences: ['2 Sam 11-12', '1 Kgs 1-2', 'Matt 1:6'], gender: 'female', description: 'Wife of David (formerly of Uriah). Mother of Solomon. Named in the lineage of Christ.' },
  { id: 'shimea-david', name: 'Shimea', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:5', description: 'Son of David and Bathsheba.' },
  { id: 'shobab', name: 'Shobab', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:5', description: 'Son of David and Bathsheba.' },
  { id: 'nathan-david', name: 'Nathan', significance: 'notable', tribe: 'judah', sources: ['1chr', 'luke'], chroniclesRef: '1 Chr 3:5', crossReferences: ['Luke 3:31'], description: 'Son of David and Bathsheba. In Luke\'s genealogy of Jesus.' },
  { id: 'solomon', name: 'Solomon', significance: 'major', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:5', crossReferences: ['1 Kgs 1-11', '2 Chr 1-9', 'Prov 1:1', 'Song 1:1', 'Matt 1:6-7'], roles: ['king', 'wise man'], description: 'Son of David and Bathsheba. Wisest king. Built the Temple in Jerusalem. Author of Proverbs and Song of Songs.' },
  { id: 'ibhar', name: 'Ibhar', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:6', description: 'Son of David born in Jerusalem.' },
  { id: 'elishama-david', name: 'Elishama', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:6', description: 'Son of David born in Jerusalem.' },
  { id: 'eliphelet-david', name: 'Eliphelet', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:6', description: 'Son of David born in Jerusalem.' },
  { id: 'nogah', name: 'Nogah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:7', description: 'Son of David born in Jerusalem.' },
  { id: 'nepheg', name: 'Nepheg', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:7', description: 'Son of David born in Jerusalem.' },
  { id: 'japhia', name: 'Japhia', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:7', description: 'Son of David born in Jerusalem.' },
  { id: 'elishama-david2', name: 'Elishama', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:8', description: 'Another son of David named Elishama.' },
  { id: 'eliada', name: 'Eliada', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:8', description: 'Son of David born in Jerusalem.' },
  { id: 'eliphelet-david2', name: 'Eliphelet', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:8', description: 'Another son of David named Eliphelet.' },
  // Solomon's line — Kings of Judah (1 Chr 3:10-16)
  { id: 'rehoboam', name: 'Rehoboam', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:10', crossReferences: ['1 Kgs 11:43-14:31', '2 Chr 10-12', 'Matt 1:7'], roles: ['king'], description: 'Son of Solomon. Under him the kingdom divided into Israel (north) and Judah (south).' },
  { id: 'abijah-rehoboam', name: 'Abijah', alternateNames: ['Abijam'], significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:10', crossReferences: ['1 Kgs 15:1-8', '2 Chr 13', 'Matt 1:7'], roles: ['king'], description: 'Son of Rehoboam, king of Judah.' },
  { id: 'asa', name: 'Asa', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:10', crossReferences: ['1 Kgs 15:9-24', '2 Chr 14-16', 'Matt 1:7-8'], roles: ['king'], description: 'Good king who removed idols and sought the LORD.' },
  { id: 'jehoshaphat', name: 'Jehoshaphat', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:10', crossReferences: ['1 Kgs 22', '2 Chr 17-20', 'Matt 1:8'], roles: ['king'], description: 'Righteous king who sent teachers throughout Judah and strengthened the nation.' },
  { id: 'joram-king', name: 'Joram', alternateNames: ['Jehoram'], significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:11', crossReferences: ['2 Kgs 8:16-24', '2 Chr 21', 'Matt 1:8'], roles: ['king'], description: 'King of Judah. Married Ahab\'s daughter; did evil.' },
  { id: 'ahaziah-king', name: 'Ahaziah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:11', crossReferences: ['2 Kgs 8:25-29', '2 Chr 22:1-9'], roles: ['king'], description: 'King of Judah. Killed by Jehu.' },
  { id: 'joash-king', name: 'Joash', alternateNames: ['Jehoash'], significance: 'notable', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:11', crossReferences: ['2 Kgs 11-12', '2 Chr 24'], roles: ['king'], description: 'Hidden as a baby and crowned at age 7. Repaired the Temple.' },
  { id: 'amaziah', name: 'Amaziah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:12', crossReferences: ['2 Kgs 14:1-22', '2 Chr 25'], roles: ['king'], description: 'King of Judah. Did right but not with a whole heart.' },
  { id: 'azariah-king', name: 'Azariah', alternateNames: ['Uzziah'], significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:12', crossReferences: ['2 Kgs 15:1-7', '2 Chr 26', 'Isa 6:1', 'Matt 1:8-9'], roles: ['king'], description: 'Long-reigning king struck with leprosy for burning incense in the Temple. Isaiah\'s call came the year he died.' },
  { id: 'jotham', name: 'Jotham', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:12', crossReferences: ['2 Kgs 15:32-38', '2 Chr 27', 'Matt 1:9'], roles: ['king'], description: 'Good king of Judah.' },
  { id: 'ahaz', name: 'Ahaz', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:13', crossReferences: ['2 Kgs 16', '2 Chr 28', 'Isa 7:1-14', 'Matt 1:9'], roles: ['king'], description: 'Wicked king who worshipped idols and sacrificed his sons.' },
  { id: 'hezekiah', name: 'Hezekiah', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:13', crossReferences: ['2 Kgs 18-20', '2 Chr 29-32', 'Isa 36-39', 'Matt 1:9-10'], roles: ['king'], description: 'One of Judah\'s greatest kings. Restored temple worship. God added 15 years to his life.' },
  { id: 'manasseh-king', name: 'Manasseh', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:13', crossReferences: ['2 Kgs 21:1-18', '2 Chr 33:1-20', 'Matt 1:10'], roles: ['king'], description: 'Most wicked king of Judah who later repented in Babylonian exile.' },
  { id: 'amon', name: 'Amon', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:14', crossReferences: ['2 Kgs 21:19-26', '2 Chr 33:21-25', 'Matt 1:10'], roles: ['king'], description: 'Wicked king of Judah, assassinated by servants.' },
  { id: 'josiah', name: 'Josiah', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:14', crossReferences: ['2 Kgs 22-23', '2 Chr 34-35', 'Matt 1:10-11'], roles: ['king'], description: 'Righteous king who found the Book of the Law and led great reforms. Killed at Megiddo.' },
  // Josiah's sons and the exile
  { id: 'johanan-josiah', name: 'Johanan', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:15', description: 'Firstborn of Josiah.' },
  { id: 'jehoiakim', name: 'Jehoiakim', alternateNames: ['Eliakim'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:15', crossReferences: ['2 Kgs 23:34-24:7', '2 Chr 36:4-8', 'Jer 22:18-19'], roles: ['king'], description: 'King of Judah. Burned Jeremiah\'s scroll. Vassal of Babylon.' },
  { id: 'zedekiah-king', name: 'Zedekiah', alternateNames: ['Mattaniah'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:15', crossReferences: ['2 Kgs 24:17-25:7', '2 Chr 36:11-21', 'Jer 52'], roles: ['king'], description: 'Last king of Judah. His rebellion led to Jerusalem\'s destruction in 586 BC.' },
  { id: 'jehoiachin', name: 'Jehoiachin', alternateNames: ['Jeconiah', 'Coniah'], significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt'], chroniclesRef: '1 Chr 3:16', crossReferences: ['2 Kgs 24:8-17', '2 Kgs 25:27-30', 'Jer 22:24-30', 'Matt 1:11-12'], roles: ['king'], description: 'King taken to Babylon. Later released from prison by Evil-merodach.' },
  // Josiah's 4th son
  { id: 'shallum-josiah', name: 'Shallum', alternateNames: ['Jehoahaz'], significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:15', crossReferences: ['2 Kgs 23:30-34', '2 Chr 36:1-4', 'Jer 22:11'], roles: ['king'], description: 'Fourth son of Josiah. Reigned briefly as Jehoahaz before being deposed by Pharaoh Neco.' },
  // 1 Chr 3:16b — Zedekiah son of Jehoiakim (different from Zedekiah son of Josiah)
  { id: 'zedekiah-jehoiakim', name: 'Zedekiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:16', description: 'Son of Jehoiakim (distinct from Zedekiah son of Josiah).' },
  // David's daughter (1 Chr 3:9)
  { id: 'tamar-david', name: 'Tamar', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:9', crossReferences: ['2 Sam 13:1-22'], gender: 'female', description: 'Daughter of David. Sister of Absalom. Violated by her half-brother Amnon.' },
  // Post-exile descendants (1 Chr 3:17-24)
  { id: 'shealtiel', name: 'Shealtiel', significance: 'minor', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 3:17', crossReferences: ['Ezra 3:2', 'Matt 1:12', 'Luke 3:27'], description: 'Son of Jehoiachin (Jeconiah) in 1 Chronicles and Matthew; called son of Neri in Luke\'s genealogy.' },
  { id: 'pedaiah', name: 'Pedaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18-19', description: 'Son of Jehoiachin, brother of Shealtiel. Father of Zerubbabel per 1 Chronicles.' },
  { id: 'malchiram', name: 'Malchiram', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18', description: 'Son of Jehoiachin.' },
  { id: 'shenazzar', name: 'Shenazzar', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18', description: 'Son of Jehoiachin.' },
  { id: 'jekamiah', name: 'Jekamiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18', description: 'Son of Jehoiachin.' },
  { id: 'hoshama', name: 'Hoshama', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18', description: 'Son of Jehoiachin.' },
  { id: 'nedabiah', name: 'Nedabiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:18', description: 'Son of Jehoiachin.' },
  { id: 'zerubbabel', name: 'Zerubbabel', significance: 'notable', tribe: 'judah', sources: ['1chr', 'matt', 'luke'], chroniclesRef: '1 Chr 3:19', crossReferences: ['Ezra 2:2', 'Ezra 3:2-8', 'Hag 1:1', 'Zech 4:6-10', 'Matt 1:12-13', 'Luke 3:27'], roles: ['governor'], description: 'Led the first return from Babylonian exile. Rebuilt the Temple. In the lineage of Christ. Called "son of Shealtiel" in Ezra and Haggai, but son of Pedaiah in 1 Chronicles.' },
  { id: 'shimei-pedaiah', name: 'Shimei', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:19', description: 'Son of Pedaiah, brother of Zerubbabel.' },
  // Sons of Zerubbabel (1 Chr 3:19-20)
  { id: 'meshullam-zerub', name: 'Meshullam', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:19', description: 'Son of Zerubbabel.' },
  { id: 'hananiah-zerub', name: 'Hananiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:19', description: 'Son of Zerubbabel.' },
  { id: 'shelomith', name: 'Shelomith', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:19', gender: 'female', description: 'Daughter of Zerubbabel.' },
  { id: 'hashubah', name: 'Hashubah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:20', description: 'Son of Zerubbabel.' },
  { id: 'ohel', name: 'Ohel', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:20', description: 'Son of Zerubbabel.' },
  { id: 'berechiah', name: 'Berechiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:20', description: 'Son of Zerubbabel.' },
  { id: 'hasadiah', name: 'Hasadiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:20', description: 'Son of Zerubbabel.' },
  { id: 'jushab-hesed', name: 'Jushab-hesed', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:20', description: 'Son of Zerubbabel.' },
  // Descendants of Hananiah (1 Chr 3:21-24)
  { id: 'pelatiah', name: 'Pelatiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Hananiah.' },
  { id: 'jeshaiah', name: 'Jeshaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Hananiah.' },
  { id: 'rephaiah-post', name: 'Rephaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Jeshaiah, post-exile descendant of David.' },
  { id: 'arnan', name: 'Arnan', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Rephaiah.' },
  { id: 'obadiah-post', name: 'Obadiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Arnan.' },
  { id: 'shecaniah', name: 'Shecaniah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:21', description: 'Son of Obadiah.' },
  { id: 'shemaiah-post', name: 'Shemaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', description: 'Son of Shecaniah.' },
  { id: 'hattush', name: 'Hattush', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', crossReferences: ['Ezra 8:2'], description: 'Son of Shemaiah. A descendant of David who returned from exile with Ezra.' },
  { id: 'igal', name: 'Igal', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', description: 'Son of Shemaiah.' },
  { id: 'bariah', name: 'Bariah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', description: 'Son of Shemaiah.' },
  { id: 'neariah', name: 'Neariah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', description: 'Son of Shemaiah.' },
  { id: 'shaphat-post', name: 'Shaphat', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:22', description: 'Son of Shemaiah.' },
  { id: 'elioenai', name: 'Elioenai', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:23', description: 'Son of Neariah.' },
  { id: 'hizkiah', name: 'Hizkiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:23', description: 'Son of Neariah.' },
  { id: 'azrikam', name: 'Azrikam', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:23', description: 'Son of Neariah.' },
  { id: 'hodaviah', name: 'Hodaviah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'eliashib', name: 'Eliashib', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'pelaiah', name: 'Pelaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'akkub', name: 'Akkub', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'johanan-post', name: 'Johanan', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'delaiah', name: 'Delaiah', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai.' },
  { id: 'anani', name: 'Anani', significance: 'minor', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 3:24', description: 'Son of Elioenai. Last named descendant of David in 1 Chronicles.' },
];

// ============================================================
// 1 CHRONICLES 4 — More Judah & Simeon
// ============================================================

const ch4_judahMore: Person[] = [
  { id: 'jabez', name: 'Jabez', significance: 'notable', tribe: 'judah', sources: ['1chr'], chroniclesRef: '1 Chr 4:9-10', roles: ['man of prayer'], description: 'More honorable than his brothers. His prayer for blessing was famously granted by God.' },
  // Simeon's sons (1 Chr 4:24-43)
  { id: 'nemuel', name: 'Nemuel', significance: 'minor', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 4:24', crossReferences: ['Num 26:12'], description: 'Son of Simeon.' },
  { id: 'jamin-simeon', name: 'Jamin', significance: 'minor', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 4:24', crossReferences: ['Gen 46:10'], description: 'Son of Simeon.' },
  { id: 'jarib', name: 'Jarib', significance: 'minor', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 4:24', description: 'Son of Simeon.' },
  { id: 'zerah-simeon', name: 'Zerah', significance: 'minor', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 4:24', description: 'Son of Simeon.' },
  { id: 'shaul-simeon', name: 'Shaul', significance: 'minor', tribe: 'simeon', sources: ['1chr'], chroniclesRef: '1 Chr 4:24', crossReferences: ['Gen 46:10'], description: 'Son of Simeon.' },
];

// ============================================================
// 1 CHRONICLES 5 — Reuben, Gad, Half-Manasseh
// ============================================================

const ch5_transjordan: Person[] = [
  // Reuben's sons (1 Chr 5:1-10)
  { id: 'hanoch-reuben', name: 'Hanoch', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:3', crossReferences: ['Gen 46:9'], description: 'Son of Reuben.' },
  { id: 'pallu', name: 'Pallu', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:3', crossReferences: ['Gen 46:9'], description: 'Son of Reuben.' },
  { id: 'hezron-reuben', name: 'Hezron', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:3', crossReferences: ['Gen 46:9'], description: 'Son of Reuben (not to be confused with Hezron of Judah).' },
  { id: 'carmi-reuben', name: 'Carmi', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:3', crossReferences: ['Gen 46:9'], description: 'Son of Reuben.' },
  { id: 'joel-reuben', name: 'Joel', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:4', description: 'Descendant of Reuben.' },
  { id: 'shemaiah-reuben', name: 'Shemaiah', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:4', description: 'Son of Joel, in the line of Reuben.' },
  { id: 'gog-reuben', name: 'Gog', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:4', description: 'Son of Shemaiah, descendant of Reuben.' },
  { id: 'shimei-reuben', name: 'Shimei', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:4', description: 'Son of Gog, descendant of Reuben.' },
  { id: 'micah-reuben', name: 'Micah', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:5', description: 'Son of Shimei, descendant of Reuben.' },
  { id: 'reaiah-reuben', name: 'Reaiah', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:5', description: 'Son of Micah, descendant of Reuben.' },
  { id: 'baal-reuben', name: 'Baal', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:5', description: 'Son of Reaiah, descendant of Reuben.' },
  { id: 'beerah', name: 'Beerah', significance: 'minor', tribe: 'reuben', sources: ['1chr'], chroniclesRef: '1 Chr 5:6', description: 'Son of Baal, chief of the Reubenites. Carried into exile by Tiglath-pileser of Assyria.' },
  // Gad (1 Chr 5:11-17)
  { id: 'joel-gad', name: 'Joel', significance: 'minor', tribe: 'gad', sources: ['1chr'], chroniclesRef: '1 Chr 5:12', description: 'Chief among the Gadites in Bashan.' },
  { id: 'shapham', name: 'Shapham', significance: 'minor', tribe: 'gad', sources: ['1chr'], chroniclesRef: '1 Chr 5:12', description: 'Second in rank among the Gadites.' },
  { id: 'janai', name: 'Janai', significance: 'minor', tribe: 'gad', sources: ['1chr'], chroniclesRef: '1 Chr 5:12', description: 'Gadite leader in Bashan.' },
  { id: 'shaphat-gad', name: 'Shaphat', significance: 'minor', tribe: 'gad', sources: ['1chr'], chroniclesRef: '1 Chr 5:12', description: 'Gadite leader in Bashan.' },
];

// ============================================================
// 1 CHRONICLES 6 — Levi's priestly line
// ============================================================

const ch6_levi: Person[] = [
  // Levi's three sons
  { id: 'gershon', name: 'Gershon', alternateNames: ['Gershom'], significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:1', crossReferences: ['Gen 46:11', 'Exod 6:16'], description: 'Firstborn of Levi. Father of the Gershonite Levitical families.' },
  { id: 'kohath', name: 'Kohath', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:1', crossReferences: ['Gen 46:11', 'Exod 6:16,18'], description: 'Second son of Levi. From his line came Moses, Aaron, and the high priests.' },
  { id: 'merari', name: 'Merari', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:1', crossReferences: ['Gen 46:11', 'Exod 6:16'], description: 'Third son of Levi. Father of the Merarite Levitical families.' },
  // Kohath to Aaron and Moses
  { id: 'amram', name: 'Amram', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:2-3', crossReferences: ['Exod 6:18,20'], description: 'Son of Kohath. Father of Aaron, Moses, and Miriam.' },
  { id: 'izhar', name: 'Izhar', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:2', crossReferences: ['Exod 6:18,21'], description: 'Son of Kohath.' },
  { id: 'hebron-levi', name: 'Hebron', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:2', crossReferences: ['Exod 6:18'], description: 'Son of Kohath.' },
  { id: 'uzziel', name: 'Uzziel', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:2', crossReferences: ['Exod 6:18,22'], description: 'Son of Kohath.' },
  { id: 'aaron', name: 'Aaron', significance: 'major', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Exod 4:14-16', 'Exod 28-29', 'Lev 8-10', 'Num 17', 'Heb 5:4', 'Heb 7:11'], roles: ['high priest'], description: 'Brother of Moses. First high priest of Israel. Spoke for Moses before Pharaoh. All priests descended from him.' },
  { id: 'moses', name: 'Moses', significance: 'major', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Exod 2-Deut 34', 'Matt 17:3', 'Heb 3:1-6', 'Heb 11:23-29'], roles: ['prophet', 'lawgiver', 'leader'], description: 'Greatest Old Testament prophet. Led Israel out of Egypt. Received the Law on Sinai. Author of the Torah.' },
  { id: 'miriam', name: 'Miriam', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Exod 2:4-8', 'Exod 15:20-21', 'Num 12', 'Mic 6:4'], gender: 'female', roles: ['prophetess'], description: 'Sister of Moses and Aaron. Led women in worship after crossing the Red Sea.' },
  // Aaron's sons
  { id: 'nadab-aaron', name: 'Nadab', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Lev 10:1-2'], description: 'Son of Aaron. Died offering unauthorized fire before the LORD.' },
  { id: 'abihu', name: 'Abihu', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Lev 10:1-2'], description: 'Son of Aaron. Died with Nadab for unauthorized worship.' },
  { id: 'eleazar-aaron', name: 'Eleazar', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3-4', crossReferences: ['Num 20:25-28', 'Josh 14:1', 'Josh 24:33'], roles: ['high priest'], description: 'Son of Aaron. Succeeded his father as high priest.' },
  { id: 'ithamar', name: 'Ithamar', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:3', crossReferences: ['Exod 6:23', 'Num 4:28,33'], description: 'Fourth son of Aaron.' },
  // High priestly line (1 Chr 6:4-15)
  { id: 'phinehas', name: 'Phinehas', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:4', crossReferences: ['Num 25:7-13', 'Josh 22:13', 'Ps 106:30-31'], roles: ['high priest'], description: 'Son of Eleazar. His zeal for God stopped a plague and earned a covenant of peace.' },
  { id: 'abishua', name: 'Abishua', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:4', description: 'Son of Phinehas, high priestly line.' },
  { id: 'bukki', name: 'Bukki', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:5', description: 'High priestly line.' },
  { id: 'uzzi-levi', name: 'Uzzi', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:5', description: 'High priestly line.' },
  { id: 'zerahiah', name: 'Zerahiah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:6', description: 'High priestly line.' },
  { id: 'meraioth', name: 'Meraioth', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:6', description: 'High priestly line.' },
  { id: 'amariah-levi', name: 'Amariah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:7', description: 'High priestly line.' },
  { id: 'ahitub', name: 'Ahitub', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:7', crossReferences: ['1 Sam 22:20'], description: 'High priestly line.' },
  { id: 'zadok', name: 'Zadok', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:8', crossReferences: ['2 Sam 8:17', '2 Sam 15:24-36', '1 Kgs 1:32-45', 'Ezek 44:15'], roles: ['high priest'], description: 'Priest who supported David and anointed Solomon king. His descendants served as high priests through the exile.' },
  { id: 'ahimaaz', name: 'Ahimaaz', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:8', crossReferences: ['2 Sam 15:27', '2 Sam 18:19-33'], description: 'Son of Zadok. Ran to bring David news during Absalom\'s rebellion.' },
  { id: 'azariah-priest1', name: 'Azariah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:9', description: 'High priestly line.' },
  { id: 'johanan-priest', name: 'Johanan', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:9', description: 'High priestly line.' },
  { id: 'azariah-temple', name: 'Azariah', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:10', crossReferences: ['2 Chr 26:17-20'], roles: ['high priest'], description: 'Served as priest in Solomon\'s temple. Confronted King Uzziah.' },
  { id: 'amariah-priest2', name: 'Amariah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:11', description: 'High priestly line.' },
  { id: 'ahitub2', name: 'Ahitub', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:11', description: 'High priestly line (later generation).' },
  { id: 'zadok2', name: 'Zadok', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:12', description: 'Later Zadok in the high priestly line.' },
  { id: 'shallum-priest', name: 'Shallum', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:12', description: 'High priestly line.' },
  { id: 'hilkiah', name: 'Hilkiah', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:13', crossReferences: ['2 Kgs 22:4-14', '2 Chr 34:14-22'], roles: ['high priest'], description: 'High priest who found the Book of the Law during Josiah\'s temple repairs.' },
  { id: 'azariah-priest3', name: 'Azariah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:13', description: 'High priestly line.' },
  { id: 'seraiah-priest', name: 'Seraiah', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:14', crossReferences: ['2 Kgs 25:18-21', 'Ezra 7:1'], description: 'Last high priest before the exile. Executed by Nebuchadnezzar.' },
  { id: 'jehozadak', name: 'Jehozadak', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:15', crossReferences: ['Hag 1:1', 'Zech 6:11'], description: 'Went into exile when Nebuchadnezzar took Judah captive. Father of Jeshua the post-exile high priest.' },
  // Temple musicians (1 Chr 6:31-48)
  { id: 'heman-singer', name: 'Heman', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:33', crossReferences: ['1 Chr 15:17', 'Ps 88 title'], roles: ['temple musician'], description: 'Kohathite singer appointed by David. Led temple worship with song.' },
  { id: 'asaph-singer', name: 'Asaph', significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:39', crossReferences: ['1 Chr 15:17', 'Ps 50', 'Ps 73-83'], roles: ['temple musician', 'psalmist'], description: 'Gershonite singer. Author of multiple Psalms. Chief musician in David\'s tabernacle.' },
  { id: 'ethan-singer', name: 'Ethan', alternateNames: ['Jeduthun'], significance: 'notable', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:44', crossReferences: ['1 Chr 15:17', 'Ps 89 title'], roles: ['temple musician'], description: 'Merarite singer. One of three chief musicians appointed by David.' },
  // Gershon's sons
  { id: 'libni', name: 'Libni', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:17', crossReferences: ['Exod 6:17'], description: 'Son of Gershon.' },
  { id: 'shimei-gershon', name: 'Shimei', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:17', crossReferences: ['Exod 6:17'], description: 'Son of Gershon.' },
  // Merari's sons
  { id: 'mahli', name: 'Mahli', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:19', crossReferences: ['Exod 6:19'], description: 'Son of Merari.' },
  { id: 'mushi', name: 'Mushi', significance: 'minor', tribe: 'levi', sources: ['1chr'], chroniclesRef: '1 Chr 6:19', crossReferences: ['Exod 6:19'], description: 'Son of Merari.' },
];

// ============================================================
// 1 CHRONICLES 7 — Northern tribes
// ============================================================

const ch7_northernTribes: Person[] = [
  // Issachar (1 Chr 7:1-5)
  { id: 'tola-issachar', name: 'Tola', significance: 'minor', tribe: 'issachar', sources: ['1chr'], chroniclesRef: '1 Chr 7:1', crossReferences: ['Gen 46:13', 'Judg 10:1-2'], description: 'Son of Issachar.' },
  { id: 'puah', name: 'Puah', alternateNames: ['Puvah'], significance: 'minor', tribe: 'issachar', sources: ['1chr'], chroniclesRef: '1 Chr 7:1', crossReferences: ['Gen 46:13'], description: 'Son of Issachar.' },
  { id: 'jashub', name: 'Jashub', significance: 'minor', tribe: 'issachar', sources: ['1chr'], chroniclesRef: '1 Chr 7:1', crossReferences: ['Gen 46:13'], description: 'Son of Issachar.' },
  { id: 'shimron', name: 'Shimron', significance: 'minor', tribe: 'issachar', sources: ['1chr'], chroniclesRef: '1 Chr 7:1', crossReferences: ['Gen 46:13'], description: 'Son of Issachar.' },
  // Benjamin brief (1 Chr 7:6-12)
  { id: 'bela-benjamin', name: 'Bela', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 7:6', crossReferences: ['Gen 46:21', 'Num 26:38'], description: 'Son of Benjamin.' },
  { id: 'beker-benjamin', name: 'Beker', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 7:6', crossReferences: ['Gen 46:21'], description: 'Son of Benjamin.' },
  { id: 'jediael', name: 'Jediael', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 7:6', description: 'Son of Benjamin.' },
  // Naphtali (1 Chr 7:13)
  { id: 'jahziel', name: 'Jahziel', significance: 'minor', tribe: 'naphtali', sources: ['1chr'], chroniclesRef: '1 Chr 7:13', crossReferences: ['Gen 46:24'], description: 'Son of Naphtali.' },
  { id: 'guni', name: 'Guni', significance: 'minor', tribe: 'naphtali', sources: ['1chr'], chroniclesRef: '1 Chr 7:13', crossReferences: ['Gen 46:24'], description: 'Son of Naphtali.' },
  { id: 'jezer', name: 'Jezer', significance: 'minor', tribe: 'naphtali', sources: ['1chr'], chroniclesRef: '1 Chr 7:13', crossReferences: ['Gen 46:24'], description: 'Son of Naphtali.' },
  { id: 'shallum-naphtali', name: 'Shallum', significance: 'minor', tribe: 'naphtali', sources: ['1chr'], chroniclesRef: '1 Chr 7:13', crossReferences: ['Gen 46:24'], description: 'Son of Naphtali.' },
  // Manasseh (1 Chr 7:14-19)
  { id: 'machir', name: 'Machir', significance: 'minor', tribe: 'manasseh', sources: ['1chr'], chroniclesRef: '1 Chr 7:14-15', crossReferences: ['Num 32:39-40', 'Josh 17:1'], description: 'Son of Manasseh. His clan conquered Gilead.' },
  { id: 'gilead-manasseh', name: 'Gilead', significance: 'minor', tribe: 'manasseh', sources: ['1chr'], chroniclesRef: '1 Chr 7:14,17', crossReferences: ['Num 26:29-30'], description: 'Son of Machir, grandson of Manasseh.' },
  // Ephraim (1 Chr 7:20-29)
  { id: 'shuthelah', name: 'Shuthelah', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:20', crossReferences: ['Num 26:35'], description: 'Son of Ephraim.' },
  { id: 'ephraim-joseph', name: 'Ephraim', significance: 'notable', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:20-22', crossReferences: ['Gen 41:52', 'Gen 48:1-20'], description: 'Second son of Joseph, blessed by Jacob with the right hand (over Manasseh). His tribe became dominant in the north.' },
  // Beriah — son of Ephraim (1 Chr 7:23)
  { id: 'beriah-ephraim', name: 'Beriah', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:23', description: 'Son of Ephraim, born after his brothers were killed by men of Gath. Named Beriah because disaster had befallen his house.' },
  // Ephraim to Joshua line — intermediate ancestors (1 Chr 7:25-27)
  { id: 'rephah', name: 'Rephah', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:25', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'resheph', name: 'Resheph', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:25', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'telah', name: 'Telah', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:25', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'tahan', name: 'Tahan', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:25', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'ladan', name: 'Ladan', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:26', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'ammihud', name: 'Ammihud', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:26', description: 'Descendant of Ephraim, in the line to Joshua.' },
  { id: 'elishama-ephraim', name: 'Elishama', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:26', description: 'Descendant of Ephraim, father of Nun, grandfather of Joshua.' },
  { id: 'manasseh-joseph', name: 'Manasseh', significance: 'notable', tribe: 'manasseh', sources: ['1chr'], chroniclesRef: '1 Chr 7:14', crossReferences: ['Gen 41:51', 'Gen 48:1-20'], description: 'Firstborn of Joseph. His tribe settled on both sides of the Jordan.' },
  { id: 'joshua-nun', name: 'Joshua', significance: 'major', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:27', crossReferences: ['Exod 17:9-13', 'Num 13-14', 'Book of Joshua', 'Heb 4:8'], roles: ['military leader', 'successor of Moses'], description: 'Son of Nun, from Ephraim. Moses\' successor. Led Israel into the Promised Land. Conquered Canaan.' },
  { id: 'nun', name: 'Nun', significance: 'minor', tribe: 'ephraim', sources: ['1chr'], chroniclesRef: '1 Chr 7:27', crossReferences: ['Exod 33:11'], description: 'Father of Joshua.' },
  // Asher (1 Chr 7:30-40)
  { id: 'imnah', name: 'Imnah', significance: 'minor', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 7:30', crossReferences: ['Gen 46:17'], description: 'Son of Asher.' },
  { id: 'ishvah', name: 'Ishvah', significance: 'minor', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 7:30', crossReferences: ['Gen 46:17'], description: 'Son of Asher.' },
  { id: 'ishvi-asher', name: 'Ishvi', significance: 'minor', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 7:30', crossReferences: ['Gen 46:17'], description: 'Son of Asher.' },
  { id: 'beriah-asher', name: 'Beriah', significance: 'minor', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 7:30', crossReferences: ['Gen 46:17'], description: 'Son of Asher.' },
  { id: 'serah', name: 'Serah', significance: 'minor', tribe: 'asher', sources: ['1chr'], chroniclesRef: '1 Chr 7:30', crossReferences: ['Gen 46:17'], gender: 'female', description: 'Daughter of Asher.' },
];

// ============================================================
// 1 CHRONICLES 8 — Benjamin expanded & Saul
// ============================================================

const ch8_benjamin: Person[] = [
  // Benjamin's sons expanded (1 Chr 8:1-5)
  { id: 'ashbel', name: 'Ashbel', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:1', crossReferences: ['Gen 46:21', 'Num 26:38'], description: 'Son of Benjamin.' },
  { id: 'aharah', name: 'Aharah', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:1', description: 'Son of Benjamin.' },
  { id: 'nohah', name: 'Nohah', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:2', description: 'Son of Benjamin.' },
  { id: 'rapha-benjamin', name: 'Rapha', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:2', description: 'Son of Benjamin.' },
  // Shaharaim's family (1 Chr 8:8-11)
  { id: 'shaharaim', name: 'Shaharaim', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:8', description: 'A Benjaminite who had children by multiple wives.' },
  { id: 'hushim-wife', name: 'Hushim', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:8,11', gender: 'female', description: 'Wife of Shaharaim. Mother of Abitub and Elpaal.' },
  { id: 'hodesh', name: 'Hodesh', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:9', gender: 'female', description: 'Wife of Shaharaim. Mother of Jobab, Zibia, Mesha, Malcam, Jeuz, Sachia, and Mirmah.' },
  { id: 'abitub', name: 'Abitub', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:11', description: 'Son of Shaharaim by Hushim.' },
  { id: 'elpaal', name: 'Elpaal', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:11-12', description: 'Son of Shaharaim by Hushim.' },
  { id: 'jobab-shaharaim', name: 'Jobab', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:9', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'zibia', name: 'Zibia', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:9', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'mesha-shaharaim', name: 'Mesha', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:9', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'malcam', name: 'Malcam', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:9', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'jeuz', name: 'Jeuz', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:10', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'sachia', name: 'Sachia', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:10', description: 'Son of Shaharaim by Hodesh.' },
  { id: 'mirmah', name: 'Mirmah', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:10', description: 'Son of Shaharaim by Hodesh.' },
  // Saul's genealogy (1 Chr 8:29-40, repeated in 9:35-44)
  { id: 'jeiel', name: 'Jeiel', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:29; 9:35', description: 'Father of Gibeon, ancestor of Saul.' },
  { id: 'ner', name: 'Ner', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33', crossReferences: ['1 Sam 14:50-51'], description: 'Father of Kish, grandfather of Saul.' },
  { id: 'kish', name: 'Kish', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33', crossReferences: ['1 Sam 9:1-3', '1 Sam 10:21'], description: 'Father of King Saul.' },
  { id: 'saul', name: 'Saul', significance: 'major', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33; 9:39', crossReferences: ['1 Sam 9-31', '1 Chr 10', 'Acts 13:21'], roles: ['king'], description: 'First king of Israel. Tall, from Benjamin. Initially faithful but later rejected by God for disobedience. Died on Mount Gilboa.' },
  { id: 'jonathan', name: 'Jonathan', significance: 'notable', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33; 9:39', crossReferences: ['1 Sam 13-14', '1 Sam 18-20', '1 Sam 31', '2 Sam 1:17-27'], roles: ['prince', 'warrior'], description: 'Son of Saul. Famous for his covenant friendship with David. Brave warrior who died alongside his father.' },
  { id: 'malchishua', name: 'Malchi-shua', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33', crossReferences: ['1 Sam 14:49', '1 Sam 31:2'], description: 'Son of Saul. Died with him at Gilboa.' },
  { id: 'abinadab-saul', name: 'Abinadab', significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33', crossReferences: ['1 Sam 31:2'], description: 'Son of Saul. Died with him at Gilboa.' },
  { id: 'eshbaal', name: 'Esh-baal', alternateNames: ['Ish-bosheth'], significance: 'minor', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:33', crossReferences: ['2 Sam 2:8-10', '2 Sam 4:5-12'], roles: ['king'], description: 'Son of Saul. Briefly reigned over Israel after Saul\'s death before David united the kingdom.' },
  { id: 'merib-baal', name: 'Merib-baal', alternateNames: ['Mephibosheth'], significance: 'notable', tribe: 'benjamin', sources: ['1chr'], chroniclesRef: '1 Chr 8:34; 9:40', crossReferences: ['2 Sam 4:4', '2 Sam 9:1-13', '2 Sam 19:24-30'], description: 'Son of Jonathan. Lame in both feet. David showed him kindness for Jonathan\'s sake, giving him a seat at the royal table.' },
];

// ============================================================
// GOSPEL OF MATTHEW — Post-Zerubbabel to Jesus (Matt 1:13-16)
// ============================================================

const gospelMatthew: Person[] = [
  { id: 'abiud', name: 'Abiud', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:13', description: 'Son of Zerubbabel in Matthew\'s genealogy.' },
  { id: 'eliakim-matt', name: 'Eliakim', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:13', description: 'Son of Abiud.' },
  { id: 'azor', name: 'Azor', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:13-14', description: 'Son of Eliakim.' },
  { id: 'zadok-matt', name: 'Zadok', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:14', description: 'Son of Azor. Not to be confused with the Levitical priest Zadok.' },
  { id: 'achim', name: 'Achim', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:14', description: 'Son of Zadok.' },
  { id: 'eliud', name: 'Eliud', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:14-15', description: 'Son of Achim.' },
  { id: 'eleazar-matt', name: 'Eleazar', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:15', description: 'Son of Eliud. Not to be confused with Eleazar son of Aaron.' },
  { id: 'matthan', name: 'Matthan', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:15', description: 'Son of Eleazar.' },
  { id: 'jacob-matt', name: 'Jacob', significance: 'minor', tribe: 'judah', sources: ['matt'], chroniclesRef: 'Matt 1:15-16', description: 'Son of Matthan, father of Joseph. Not to be confused with the patriarch Jacob/Israel.' },
  { id: 'joseph-mary', name: 'Joseph', significance: 'notable', tribe: 'judah', sources: ['matt', 'luke'], chroniclesRef: 'Matt 1:16; Luke 3:23', crossReferences: ['Matt 1:18-25', 'Matt 2:13-23', 'Luke 1:27', 'Luke 2:4-7'], roles: ['carpenter', 'guardian of Jesus'], description: 'Husband of Mary, legal father of Jesus. A righteous man from the line of David.' },
  { id: 'mary', name: 'Mary', alternateNames: ['Miriam'], significance: 'major', tribe: 'judah', sources: ['matt', 'luke'], chroniclesRef: 'Matt 1:16; Luke 1:27', crossReferences: ['Matt 1:18-25', 'Luke 1:26-56', 'Luke 2:1-20', 'John 2:1-12', 'John 19:25-27', 'Acts 1:14'], gender: 'female', roles: ['mother of Jesus', 'virgin'], description: 'The virgin mother of Jesus Christ. A young woman of Nazareth betrothed to Joseph. "Blessed are you among women" (Luke 1:42).' },
  { id: 'jesus', name: 'Jesus', alternateNames: ['Yeshua', 'Christ', 'Messiah'], significance: 'major', tribe: 'judah', sources: ['matt', 'luke'], chroniclesRef: 'Matt 1:16; Luke 3:23', crossReferences: ['Matt-Rev (entire NT)'], roles: ['Messiah', 'Son of God', 'King of Kings'], description: 'Jesus Christ, the Son of God. The promised Messiah — the ultimate fulfillment of every genealogy in Scripture. Born of the Virgin Mary in Bethlehem.' },
];

// ============================================================
// GOSPEL OF LUKE — Unique sections of Luke's genealogy
// ============================================================

const gospelLuke: Person[] = [
  // Luke's extra Cainan (between Arpachshad and Shelah, from LXX)
  { id: 'cainan-luke', name: 'Cainan', significance: 'minor', tribe: 'pre-tribal', sources: ['luke'], chroniclesRef: 'Luke 3:36', description: 'Between Arphaxad and Shelah in Luke\'s genealogy (from the Septuagint).' },
  // Luke uses Arni/Admin where Chronicles uses Ram
  { id: 'arni', name: 'Arni', alternateNames: ['Ram'], significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:33', description: 'In Luke\'s genealogy between Hezron and Admin. May correspond to Ram in Chronicles.' },
  { id: 'admin', name: 'Admin', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:33', description: 'Between Arni and Amminadab in Luke\'s genealogy.' },
  // Nathan to Shealtiel (Luke 3:27-31)
  { id: 'mattatha', name: 'Mattatha', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:31', description: 'Son of Nathan, grandson of David. In Luke\'s genealogy.' },
  { id: 'menna', name: 'Menna', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:31', description: 'Son of Mattatha in Luke\'s genealogy.' },
  { id: 'melea', name: 'Melea', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:31', description: 'Son of Menna.' },
  { id: 'eliakim-luke', name: 'Eliakim', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:30', description: 'Son of Melea in Luke\'s genealogy.' },
  { id: 'jonam', name: 'Jonam', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:30', description: 'Son of Eliakim.' },
  { id: 'joseph-luke1', name: 'Joseph', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:30', description: 'Son of Jonam in Luke\'s genealogy.' },
  { id: 'judah-luke', name: 'Judah', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:30', description: 'Son of Joseph in Luke\'s genealogy. Not the patriarch Judah.' },
  { id: 'simeon-luke', name: 'Simeon', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:30', description: 'Son of Judah in Luke\'s genealogy. Not the patriarch Simeon.' },
  { id: 'levi-luke1', name: 'Levi', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:29', description: 'Son of Simeon in Luke\'s genealogy. Not the patriarch Levi.' },
  { id: 'matthat-luke1', name: 'Matthat', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:29', description: 'Son of Levi in Luke\'s genealogy.' },
  { id: 'jorim', name: 'Jorim', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:29', description: 'Son of Matthat.' },
  { id: 'eliezer-luke', name: 'Eliezer', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:29', description: 'Son of Jorim.' },
  { id: 'joshua-luke', name: 'Joshua', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:29', description: 'Son of Eliezer in Luke\'s genealogy. Not Joshua son of Nun.' },
  { id: 'er-luke', name: 'Er', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:28', description: 'Son of Joshua in Luke\'s genealogy.' },
  { id: 'elmadam', name: 'Elmadam', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:28', description: 'Son of Er.' },
  { id: 'cosam', name: 'Cosam', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:28', description: 'Son of Elmadam.' },
  { id: 'addi', name: 'Addi', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:28', description: 'Son of Cosam.' },
  { id: 'melchi-luke1', name: 'Melchi', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:28', description: 'Son of Addi.' },
  { id: 'neri', name: 'Neri', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:27', description: 'Son of Melchi. Father of Shealtiel in Luke\'s genealogy.' },
  // Post-Zerubbabel in Luke (Luke 3:23-27)
  { id: 'rhesa', name: 'Rhesa', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:27', description: 'Son of Zerubbabel in Luke\'s genealogy.' },
  { id: 'joanan', name: 'Joanan', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:27', description: 'Son of Rhesa.' },
  { id: 'joda', name: 'Joda', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:26', description: 'Son of Joanan.' },
  { id: 'josech', name: 'Josech', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:26', description: 'Son of Joda.' },
  { id: 'semein', name: 'Semein', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:26', description: 'Son of Josech.' },
  { id: 'mattathias-luke1', name: 'Mattathias', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:26', description: 'Son of Semein.' },
  { id: 'maath', name: 'Maath', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:26', description: 'Son of Mattathias.' },
  { id: 'naggai', name: 'Naggai', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:25', description: 'Son of Maath.' },
  { id: 'esli', name: 'Esli', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:25', description: 'Son of Naggai.' },
  { id: 'nahum-luke', name: 'Nahum', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:25', description: 'Son of Esli.' },
  { id: 'amos-luke', name: 'Amos', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:25', description: 'Son of Nahum in Luke\'s genealogy.' },
  { id: 'mattathias-luke2', name: 'Mattathias', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:25', description: 'Son of Amos. A second Mattathias in Luke\'s genealogy.' },
  { id: 'joseph-luke2', name: 'Joseph', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:24', description: 'Son of Mattathias in Luke\'s genealogy.' },
  { id: 'jannai', name: 'Jannai', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:24', description: 'Son of Joseph.' },
  { id: 'melchi-luke2', name: 'Melchi', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:24', description: 'Son of Jannai.' },
  { id: 'levi-luke2', name: 'Levi', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:24', description: 'Son of Melchi in Luke\'s genealogy.' },
  { id: 'matthat-luke2', name: 'Matthat', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:24', description: 'Son of Levi.' },
  { id: 'heli', name: 'Heli', significance: 'minor', tribe: 'judah', sources: ['luke'], chroniclesRef: 'Luke 3:23', description: 'Father of Joseph (or possibly father of Mary) in Luke\'s genealogy.' },
];

// ============================================================
// Export all persons
// ============================================================

export const allPersons: Person[] = [
  ...ch1_adamToNoah,
  ...ch1_japheth,
  ...ch1_ham,
  ...ch1_shem,
  ...ch1_abraham,
  ...ch1_esau,
  ...ch2_sonsOfIsrael,
  ...ch2_judahLine,
  ...ch3_davidLine,
  ...ch4_judahMore,
  ...ch5_transjordan,
  ...ch6_levi,
  ...ch7_northernTribes,
  ...ch8_benjamin,
  ...gospelMatthew,
  ...gospelLuke,
];
