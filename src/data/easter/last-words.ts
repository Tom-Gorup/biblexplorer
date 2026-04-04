export interface LastWord {
  id: string;
  number: number;
  word: string;
  ref: string;
  context: string;
  meditation: string;
  theme: string;
  color: string;
  crossRefs: string[];
}

export const sevenLastWords: LastWord[] = [
  {
    id: 'forgiveness',
    number: 1,
    word: 'Father, forgive them, for they know not what they do.',
    ref: 'Luke 23:34',
    context: 'Spoken as the soldiers nailed Jesus to the cross and cast lots for his garments. His first words from the cross were not of anger or pain, but of intercession for his executioners.',
    meditation: 'Even in his greatest agony, Jesus\' first instinct was mercy. He practiced what he preached — "Love your enemies and pray for those who persecute you" (Matt 5:44). If the Son of God can forgive those driving nails into his hands, what grudge can we justify holding?',
    theme: 'Forgiveness',
    color: '#22c55e',
    crossRefs: ['Matt 5:44', 'Acts 7:60', 'Isa 53:12'],
  },
  {
    id: 'salvation',
    number: 2,
    word: 'Truly, I say to you, today you will be with me in paradise.',
    ref: 'Luke 23:43',
    context: 'Spoken to the repentant criminal crucified beside him. One thief mocked Jesus; the other rebuked him and asked Jesus to remember him. With no baptism, no good works, no church membership — just a dying man\'s faith — Jesus promised him paradise.',
    meditation: 'This is the gospel in miniature. A man with nothing to offer, no time to prove himself, no works to show — and Jesus saves him completely. Salvation has always been by grace through faith. It was never too late for the thief. It is never too late for us.',
    theme: 'Salvation',
    color: '#facc15',
    crossRefs: ['Eph 2:8-9', 'Rom 10:9', '2 Cor 5:8'],
  },
  {
    id: 'relationship',
    number: 3,
    word: 'Woman, behold, your son! ... Behold, your mother!',
    ref: 'John 19:26-27',
    context: 'Spoken to his mother Mary and the beloved disciple John, standing at the foot of the cross. Even while bearing the sins of the world, Jesus tenderly provided for his mother\'s care, entrusting her to John.',
    meditation: 'In his darkest hour, Jesus thought of others. He honored his mother. He created a new family — not by blood, but by love. The cross doesn\'t destroy relationships; it transforms them. Jesus shows us that even in suffering, we can still love.',
    theme: 'Love & Care',
    color: '#f472b6',
    crossRefs: ['Exod 20:12', 'John 13:34-35', '1 Tim 5:8'],
  },
  {
    id: 'abandonment',
    number: 4,
    word: 'My God, my God, why have you forsaken me?',
    ref: 'Matt 27:46',
    context: 'Spoken at the ninth hour (3 PM) after three hours of supernatural darkness. Jesus cried out in Aramaic — "Eli, Eli, lema sabachthani?" — quoting the opening of Psalm 22. This is the only time in the Gospels where Jesus does not address God as "Father."',
    meditation: 'This is the most mysterious and devastating moment in all of Scripture. The eternal Son, who had known unbroken fellowship with the Father from eternity, experienced the full weight of separation that sin causes. He bore our forsakenness so we would never have to. The one who cried "Why?" is the reason we never will.',
    theme: 'Abandonment & Atonement',
    color: '#1e293b',
    crossRefs: ['Ps 22:1', '2 Cor 5:21', 'Isa 53:4-6', 'Hab 1:13'],
  },
  {
    id: 'suffering',
    number: 5,
    word: 'I thirst.',
    ref: 'John 19:28',
    context: 'Spoken to fulfill Scripture (Ps 69:21). The One who offered living water to the woman at the well, who stood in the Temple and cried "If anyone thirsts, let him come to me and drink" — now thirsts himself.',
    meditation: 'Two simple words that reveal the full humanity of Jesus. The Creator of oceans was parched. The source of living water was dry. He entered our thirst — our deepest physical and spiritual need — so he could quench it forever. "Whoever drinks of the water that I will give him will never be thirsty again" (John 4:14).',
    theme: 'Humanity & Thirst',
    color: '#38bdf8',
    crossRefs: ['Ps 69:21', 'John 4:14', 'John 7:37-38', 'Rev 21:6'],
  },
  {
    id: 'completion',
    number: 6,
    word: 'It is finished.',
    ref: 'John 19:30',
    context: 'Spoken just before death. The Greek word is "tetelestai" — a single word meaning "it is finished," "it is accomplished," "paid in full." This was the word written on receipts when a debt was fully discharged.',
    meditation: 'Not "I am finished" — "IT is finished." The work of redemption is complete. The debt is paid. The sacrifice is sufficient. Nothing needs to be added. This is the most important declaration in human history — the moment when everything God had been working toward since Genesis 3:15 was accomplished. The old covenant is fulfilled. The new covenant is sealed. It is finished.',
    theme: 'Completion & Victory',
    color: '#a78bfa',
    crossRefs: ['John 4:34', 'John 17:4', 'Heb 9:12', 'Heb 10:14', 'Col 2:14'],
  },
  {
    id: 'trust',
    number: 7,
    word: 'Father, into your hands I commit my spirit!',
    ref: 'Luke 23:46',
    context: 'Jesus\' final words, spoken with a loud voice just before he breathed his last. He quotes Psalm 31:5 — a Jewish evening prayer that children were taught to say before sleep. His first word from the cross was "Father" (Luke 23:34), and so was his last.',
    meditation: 'He began with "Father, forgive them" and ended with "Father, into your hands." The circle closes. Despite the darkness, despite the forsakenness, Jesus dies with trust. He commits his spirit to the Father — the same Father he felt forsaken by moments before. Faith is not the absence of darkness; it is trust in the midst of it. And notice: he says it with a loud voice. Not a whimper. He chose this moment. No one takes his life from him — he lays it down.',
    theme: 'Trust & Surrender',
    color: '#f59e0b',
    crossRefs: ['Ps 31:5', 'John 10:18', '1 Pet 4:19', 'Acts 7:59'],
  },
];
