import type { SKLocation } from '../../types/samuel-kings';

// ============================================================
// KEY LOCATIONS IN SAMUEL & KINGS
// Coordinates are real lat/lng (WGS84)
// ============================================================

export const allLocations: SKLocation[] = [
  // --- Major Cities ---
  { id: 'jerusalem',     name: 'Jerusalem',       x: 35.2354, y: 31.7683, kingdom: 'judah',  description: 'Capital of the united monarchy under David and Solomon, then capital of Judah. Site of the Temple.' },
  { id: 'samaria',       name: 'Samaria',         x: 35.1932, y: 32.2765, kingdom: 'israel', description: 'Capital of the northern kingdom from Omri onward. Fell to Assyria in 722 BC.' },
  { id: 'hebron',        name: 'Hebron',          x: 35.0954, y: 31.5326, kingdom: 'judah',  description: "David's first capital where he reigned over Judah for seven years." },
  { id: 'bethlehem',     name: 'Bethlehem',       x: 35.2024, y: 31.7054, kingdom: 'judah',  description: "City of David's birth and anointing by Samuel." },
  { id: 'shechem',       name: 'Shechem',         x: 35.2710, y: 32.2130, kingdom: 'israel', description: "Where Rehoboam's harshness caused the kingdom to split." },
  // --- Northern Kingdom Sites ---
  { id: 'dan',           name: 'Dan',             x: 35.6523, y: 33.2488, kingdom: 'israel', description: 'Northernmost city of Israel where Jeroboam set up a golden calf.' },
  { id: 'bethel',        name: 'Bethel',          x: 35.2339, y: 31.9302, kingdom: 'israel', description: "Southern golden calf site established by Jeroboam." },
  { id: 'jezreel',       name: 'Jezreel',         x: 35.3277, y: 32.5577, kingdom: 'israel', description: "Ahab's winter palace. Site of Naboth's vineyard and Jezebel's death." },
  { id: 'tirzah',        name: 'Tirzah',          x: 35.3052, y: 32.3035, kingdom: 'israel', description: 'Capital of Israel before Omri moved it to Samaria.' },
  { id: 'mount-carmel',  name: 'Mount Carmel',    x: 35.0425, y: 32.7410, kingdom: 'israel', description: 'Where Elijah confronted the 450 prophets of Baal.' },
  { id: 'dothan',        name: 'Dothan',          x: 35.2378, y: 32.3960, kingdom: 'israel', description: "Where Elisha was surrounded by the Aramean army." },
  // --- Southern / Judah Sites ---
  { id: 'lachish',       name: 'Lachish',         x: 34.8489, y: 31.5640, kingdom: 'judah',  description: 'Major fortified city of Judah. Besieged by Sennacherib.' },
  { id: 'beersheba',     name: 'Beersheba',       x: 34.7913, y: 31.2518, kingdom: 'judah',  description: 'Southern boundary of the kingdom.' },
  { id: 'megiddo',       name: 'Megiddo',         x: 35.1845, y: 32.5847, kingdom: 'israel', description: 'Strategic fortress city. Where Josiah was killed fighting Pharaoh Neco.' },
  // --- Battlefields ---
  { id: 'gilboa',        name: 'Mount Gilboa',    x: 35.4156, y: 32.5003, description: 'Where Saul and Jonathan fell in battle against the Philistines.' },
  { id: 'valley-of-elah', name: 'Valley of Elah', x: 34.9547, y: 31.6935, kingdom: 'judah', description: 'Where David killed Goliath.' },
  { id: 'ramoth-gilead', name: 'Ramoth-gilead',   x: 35.9900, y: 32.5600, description: 'Where Ahab was killed in battle despite his disguise.' },
  // --- Nearby / Foreign ---
  { id: 'damascus',      name: 'Damascus',        x: 36.2920, y: 33.5130, description: 'Capital of Aram (Syria). Ruled by Ben-hadad and Hazael.' },
  { id: 'tyre',          name: 'Tyre',            x: 35.1956, y: 33.2705, description: 'Phoenician port city. King Hiram allied with David and Solomon.' },
  { id: 'nineveh',       name: 'Nineveh',         x: 43.1500, y: 36.3600, description: 'Capital of the Assyrian empire that conquered Israel in 722 BC.' },
  { id: 'babylon',       name: 'Babylon',         x: 44.4200, y: 32.5400, description: 'Capital of Babylonian empire. Nebuchadnezzar destroyed Jerusalem.' },
  // --- Other Significant Sites ---
  { id: 'shiloh',        name: 'Shiloh',          x: 35.2892, y: 32.0554, kingdom: 'israel', description: 'Where the Tabernacle stood and Samuel grew up.' },
  { id: 'gibeon',        name: 'Gibeon',          x: 35.1848, y: 31.8469, kingdom: 'judah',  description: 'Where Solomon received wisdom from God in a dream.' },
  { id: 'mount-horeb',   name: 'Mount Horeb',     x: 33.9750, y: 28.5394, description: 'Where Elijah heard God in the still small voice.' },
  { id: 'zarephath',     name: 'Zarephath',       x: 35.2937, y: 33.4553, description: "Phoenician town where Elijah stayed with a widow during the famine." },
  { id: 'gilgal',        name: 'Gilgal',          x: 35.4400, y: 31.8700, kingdom: 'judah',  description: "Saul was confirmed as king here. Important worship site." },
  { id: 'mizpah',        name: 'Mizpah',          x: 35.1900, y: 31.8500, kingdom: 'judah',  description: "Where Samuel judged Israel and Saul was publicly chosen as king." },
  { id: 'gibeah',        name: 'Gibeah',          x: 35.2300, y: 31.8100, kingdom: 'judah',  description: "Saul's hometown and royal residence." },
  { id: 'jordan-river',  name: 'Jordan River',    x: 35.5300, y: 31.8400, description: 'River where Naaman washed and was healed, and near which Elijah was taken up to heaven.' },
  { id: 'en-dor',        name: 'En-dor',          x: 35.3950, y: 32.6330, kingdom: 'israel', description: 'Village where Saul consulted a medium on the eve of his death.' },
  { id: 'ziklag',        name: 'Ziklag',          x: 34.6800, y: 31.3800, kingdom: 'judah',  description: "Philistine-granted town where David lived as a fugitive and lamented Saul and Jonathan." },
  { id: 'abel-meholah',  name: 'Abel-meholah',    x: 35.5000, y: 32.3500, kingdom: 'israel', description: "Elisha's hometown, where Elijah cast his mantle on him at the plow." },
  { id: 'shunem',        name: 'Shunem',          x: 35.3350, y: 32.6050, kingdom: 'israel', description: 'Village where Elisha raised the Shunammite woman\'s son.' },
  { id: 'kir-hareseth',  name: 'Kir-hareseth',    x: 35.7000, y: 31.1800, description: 'Fortress capital of Moab, besieged in the campaign of the three kings.' },
];
