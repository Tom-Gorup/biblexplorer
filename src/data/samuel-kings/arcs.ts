import type { ArcPoint } from '../../types/samuel-kings';

// ============================================================
// CHARACTER INFLUENCE ARCS
// influence: 0 (lowest) to 100 (peak power/influence)
// ============================================================

export const characterArcs: Record<string, ArcPoint[]> = {
  'saul': [
    { year: 1050, influence: 10, label: 'Anointed by Samuel', ref: '1 Sam 10:1' },
    { year: 1048, influence: 55, label: 'Defeats Ammonites at Jabesh-gilead', ref: '1 Sam 11:11' },
    { year: 1045, influence: 60, label: 'Unlawful sacrifice at Gilgal; first rebuke', ref: '1 Sam 13:13-14' },
    { year: 1040, influence: 70, label: 'Wars against Philistines; military peak', ref: '1 Sam 14:47-48' },
    { year: 1028, influence: 50, label: 'Rejected by God after Amalekite disobedience', ref: '1 Sam 15:26' },
    { year: 1025, influence: 45, label: 'David anointed; Spirit departs from Saul', ref: '1 Sam 16:13-14' },
    { year: 1020, influence: 35, label: 'Pursues David in jealous rage', ref: '1 Sam 18:10-11' },
    { year: 1015, influence: 20, label: 'Massacres priests of Nob', ref: '1 Sam 22:18-19' },
    { year: 1011, influence: 10, label: 'Consults the medium at Endor', ref: '1 Sam 28:7-20' },
    { year: 1010, influence: 0, label: 'Killed at Mount Gilboa', ref: '1 Sam 31:4' },
  ],

  'david': [
    { year: 1025, influence: 5, label: 'Anointed by Samuel as a youth', ref: '1 Sam 16:13' },
    { year: 1024, influence: 20, label: 'Kills Goliath', ref: '1 Sam 17:50' },
    { year: 1020, influence: 30, label: 'Military success; popular with the people', ref: '1 Sam 18:7' },
    { year: 1015, influence: 15, label: 'Fugitive from Saul in the wilderness', ref: '1 Sam 23:14' },
    { year: 1010, influence: 50, label: 'Crowned king of Judah in Hebron', ref: '2 Sam 2:4' },
    { year: 1003, influence: 75, label: 'Crowned king of all Israel; captures Jerusalem', ref: '2 Sam 5:3-7' },
    { year: 1000, influence: 85, label: 'Brings the Ark to Jerusalem with rejoicing', ref: '2 Sam 6:12-15' },
    { year: 999, influence: 90, label: 'Davidic covenant; empire at its peak', ref: '2 Sam 7:16' },
    { year: 990, influence: 65, label: 'Sin with Bathsheba; family turmoil begins', ref: '2 Sam 11-12' },
    { year: 978, influence: 45, label: 'Flees Jerusalem during Absalom\'s rebellion', ref: '2 Sam 15:14' },
    { year: 976, influence: 60, label: 'Restored after Absalom\'s death', ref: '2 Sam 19:15' },
    { year: 971, influence: 50, label: 'Census and plague; purchases Temple site', ref: '2 Sam 24:18-25' },
    { year: 970, influence: 40, label: 'Dies; Solomon succeeds him', ref: '1 Kgs 2:10' },
  ],

  'solomon': [
    { year: 970, influence: 40, label: 'Anointed king; secures the throne', ref: '1 Kgs 1:39' },
    { year: 968, influence: 70, label: 'Receives wisdom from God at Gibeon', ref: '1 Kgs 3:12' },
    { year: 959, influence: 95, label: 'Temple completed; glory fills the house', ref: '1 Kgs 8:10-11' },
    { year: 950, influence: 100, label: 'Queen of Sheba visits; peak of fame and wealth', ref: '1 Kgs 10:1-13' },
    { year: 945, influence: 85, label: 'Massive building projects; forced labor sows discontent', ref: '1 Kgs 9:15-22' },
    { year: 940, influence: 60, label: 'Foreign wives turn his heart to other gods', ref: '1 Kgs 11:4' },
    { year: 935, influence: 45, label: 'God raises up adversaries: Hadad, Rezon, Jeroboam', ref: '1 Kgs 11:14-26' },
    { year: 930, influence: 30, label: 'Dies; kingdom divides', ref: '1 Kgs 11:43' },
  ],

  'elijah': [
    { year: 870, influence: 30, label: 'Declares drought; fed by ravens at the brook', ref: '1 Kgs 17:1-6' },
    { year: 869, influence: 35, label: 'Sustained by widow of Zarephath; raises her son', ref: '1 Kgs 17:8-24' },
    { year: 867, influence: 100, label: 'Fire from heaven on Mount Carmel', ref: '1 Kgs 18:38' },
    { year: 866, influence: 15, label: 'Flees to Horeb in fear of Jezebel', ref: '1 Kgs 19:3-4' },
    { year: 865, influence: 50, label: 'Still small voice at Horeb; recommissioned; calls Elisha', ref: '1 Kgs 19:11-21' },
    { year: 856, influence: 70, label: 'Confronts Ahab at Naboth\'s vineyard', ref: '1 Kgs 21:17-24' },
    { year: 852, influence: 60, label: 'Calls fire on Ahaziah\'s soldiers', ref: '2 Kgs 1:10-12' },
    { year: 850, influence: 90, label: 'Taken to heaven in chariot of fire', ref: '2 Kgs 2:11' },
  ],

  'elisha': [
    { year: 865, influence: 10, label: 'Called by Elijah; leaves the plow', ref: '1 Kgs 19:19-21' },
    { year: 850, influence: 50, label: 'Receives double portion; parts the Jordan', ref: '2 Kgs 2:14' },
    { year: 847, influence: 55, label: 'Multiplies widow\'s oil; raises Shunammite\'s son', ref: '2 Kgs 4:1-37' },
    { year: 845, influence: 65, label: 'Heals Naaman of leprosy', ref: '2 Kgs 5:14' },
    { year: 844, influence: 75, label: 'Blinds Aramean army; leads them to Samaria', ref: '2 Kgs 6:18-20' },
    { year: 843, influence: 80, label: 'Prophesies end of siege and famine in Samaria', ref: '2 Kgs 7:1' },
    { year: 842, influence: 75, label: 'Foretells Hazael\'s reign over Aram; weeps at his cruelty to come', ref: '2 Kgs 8:7-15' },
    { year: 841, influence: 90, label: 'Sends prophet to anoint Jehu; triggers revolution', ref: '2 Kgs 9:1-3' },
    { year: 798, influence: 70, label: 'Final prophecy to Jehoash; dies', ref: '2 Kgs 13:14-20' },
  ],

  'ahab-king': [
    { year: 874, influence: 50, label: 'Becomes king; marries Jezebel; introduces Baal worship', ref: '1 Kgs 16:29-33' },
    { year: 870, influence: 40, label: 'Drought proclaimed by Elijah', ref: '1 Kgs 17:1' },
    { year: 867, influence: 35, label: 'Humiliated at Mount Carmel', ref: '1 Kgs 18:17-40' },
    { year: 862, influence: 65, label: 'Defeats Ben-hadad twice', ref: '1 Kgs 20:21,29' },
    { year: 860, influence: 70, label: 'Treaty with Ben-hadad; peak diplomatic power', ref: '1 Kgs 20:34' },
    { year: 856, influence: 55, label: 'Naboth\'s vineyard; Elijah\'s curse on his dynasty', ref: '1 Kgs 21:19' },
    { year: 854, influence: 45, label: 'Repents temporarily; judgment delayed', ref: '1 Kgs 21:27-29' },
    { year: 853, influence: 0, label: 'Killed by random arrow at Ramoth-gilead', ref: '1 Kgs 22:34-37' },
  ],

  'hezekiah': [
    { year: 715, influence: 50, label: 'Becomes king; purifies Temple in his first year; destroys Nehushtan', ref: '2 Kgs 18:1-6; 2 Chr 29:3' },
    { year: 714, influence: 70, label: 'Great Passover celebration; worship restored', ref: '2 Chr 30:1-27' },
    { year: 705, influence: 75, label: 'Builds tunnel; fortifies Jerusalem', ref: '2 Kgs 20:20' },
    { year: 701, influence: 50, label: 'Sennacherib invades; pays heavy tribute', ref: '2 Kgs 18:13-16' },
    { year: 701, influence: 95, label: 'Prays; angel destroys 185,000 Assyrians', ref: '2 Kgs 19:35' },
    { year: 700, influence: 85, label: 'Healed of terminal illness; 15 years added', ref: '2 Kgs 20:5-6' },
    { year: 699, influence: 60, label: 'Shows treasures to Babylonian envoys (unwise)', ref: '2 Kgs 20:12-15' },
    { year: 686, influence: 50, label: 'Dies; Manasseh succeeds him', ref: '2 Kgs 20:21' },
  ],

  'josiah': [
    { year: 640, influence: 15, label: 'Becomes king at age eight', ref: '2 Kgs 22:1' },
    { year: 632, influence: 35, label: 'Begins seeking God at age sixteen', ref: '2 Chr 34:3' },
    { year: 628, influence: 55, label: 'Begins purging idolatry at age twenty', ref: '2 Chr 34:3-7' },
    { year: 622, influence: 90, label: 'Book of the Law found; great reform and Passover', ref: '2 Kgs 22:8-23:25' },
    { year: 615, influence: 80, label: 'Judah at peace; no king turned to the LORD like Josiah', ref: '2 Kgs 23:25' },
    { year: 609, influence: 0, label: 'Killed at Megiddo opposing Pharaoh Neco', ref: '2 Kgs 23:29' },
  ],
};
