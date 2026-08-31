export interface PassionEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  participants: string[];
  primaryRef: string;
  crossRefs?: string[];
  category:
    | 'entry'
    | 'teaching'
    | 'miracle'
    | 'confrontation'
    | 'worship'
    | 'betrayal'
    | 'trial'
    | 'suffering'
    | 'death'
    | 'burial'
    | 'resurrection';
}

export interface PassionDay {
  day: string;
  date: string;
  theme: string;
  color: string;
  events: PassionEvent[];
}

export const passionWeek: PassionDay[] = [
  // ── Palm Sunday ──────────────────────────────────────────────
  {
    day: 'Palm Sunday',
    date: 'Nisan 10',
    theme: 'The King Arrives',
    color: '#facc15',
    events: [
      {
        id: 'triumphal-entry',
        title: 'Triumphal Entry into Jerusalem',
        description:
          'Jesus rides into Jerusalem on a donkey as crowds wave palm branches and shout "Hosanna to the Son of David!" fulfilling Zechariah 9:9. The whole city is stirred, asking "Who is this?"',
        location: 'Mount of Olives to Jerusalem',
        participants: ['Jesus', 'Disciples', 'Crowds'],
        primaryRef: 'Matt 21:1-11',
        crossRefs: ['Mark 11:1-11', 'Luke 19:28-44', 'John 12:12-19'],
        category: 'entry',
      },
      {
        id: 'weeps-over-jerusalem',
        title: 'Jesus Weeps over Jerusalem',
        description:
          'As Jesus approaches Jerusalem, He weeps over the city, saying "If you, even you, had only known on this day what would bring you peace." He prophesies the destruction of Jerusalem because it did not recognize the time of God\'s coming.',
        location: 'Overlooking Jerusalem',
        participants: ['Jesus', 'Disciples'],
        primaryRef: 'Luke 19:41-44',
        category: 'teaching',
      },
    ],
  },

  // ── Monday ───────────────────────────────────────────────────
  {
    day: 'Monday',
    date: 'Nisan 11',
    theme: 'The Temple Cleansed',
    color: '#ef4444',
    events: [
      {
        id: 'curses-fig-tree',
        title: 'Curses the Fig Tree',
        description:
          'On the way to Jerusalem, Jesus sees a fig tree with leaves but no fruit and curses it: "May no one ever eat fruit from you again." The fig tree represents Israel\'s spiritual barrenness -- outward religious show without genuine fruit.',
        location: 'Road from Bethany',
        participants: ['Jesus', 'Disciples'],
        primaryRef: 'Mark 11:12-14',
        crossRefs: ['Matt 21:18-19'],
        category: 'miracle',
      },
      {
        id: 'cleanses-temple',
        title: 'Cleanses the Temple',
        description:
          'Jesus enters the Temple and drives out those buying and selling, overturning the tables of the money changers and the benches of those selling doves. He declares, "My house shall be called a house of prayer, but you make it a den of robbers."',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Money changers', 'Merchants'],
        primaryRef: 'Matt 21:12-13',
        crossRefs: ['Mark 11:15-17'],
        category: 'confrontation',
      },
      {
        id: 'temple-healing',
        title: 'Healing the Blind and Lame in the Temple',
        description: 'After cleansing the Temple, the blind and lame came to Jesus and he healed them. The chief priests and scribes were indignant, but children cried out "Hosanna to the Son of David!"',
        location: 'Temple, Jerusalem',
        participants: ['Jesus'],
        primaryRef: 'Matt 21:14-16',
        category: 'miracle',
      },
    ],
  },

  // ── Tuesday ──────────────────────────────────────────────────
  {
    day: 'Tuesday',
    date: 'Nisan 12',
    theme: 'The Great Teaching Day',
    color: '#3b82f6',
    events: [
      {
        id: 'withered-fig-tree',
        title: 'Withered Fig Tree Lesson',
        description:
          'The disciples see the fig tree withered from the roots. Jesus uses this as a lesson on faith and prayer: "Have faith in God... whatever you ask in prayer, believe that you have received it, and it will be yours."',
        location: 'Road to Jerusalem',
        participants: ['Jesus', 'Peter', 'Disciples'],
        primaryRef: 'Mark 11:20-26',
        category: 'teaching',
      },
      {
        id: 'authority-questioned',
        title: 'Authority Questioned',
        description:
          'The chief priests and elders challenge Jesus: "By what authority are you doing these things?" Jesus responds with a counter-question about the baptism of John, which they cannot answer without condemning themselves.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Chief priests', 'Elders'],
        primaryRef: 'Matt 21:23-27',
        category: 'confrontation',
      },
      {
        id: 'parable-two-sons',
        title: 'Parable of the Two Sons',
        description:
          'A father asks two sons to work in his vineyard. One refuses but later goes; the other agrees but never goes. Jesus declares that tax collectors and prostitutes are entering the kingdom of God ahead of the religious leaders, because they believed John.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Chief priests', 'Elders'],
        primaryRef: 'Matt 21:28-32',
        category: 'teaching',
      },
      {
        id: 'parable-wicked-tenants',
        title: 'Parable of the Wicked Tenants',
        description:
          'A landowner plants a vineyard and leases it to tenants who beat and kill his servants. Finally he sends his son, and they kill him too. Jesus warns that the kingdom will be taken from the leaders and given to a people producing its fruits.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Chief priests', 'Pharisees'],
        primaryRef: 'Matt 21:33-46',
        category: 'teaching',
      },
      {
        id: 'parable-wedding-feast',
        title: 'Parable of the Wedding Feast',
        description:
          'A king prepares a wedding banquet for his son. The invited guests refuse to come and mistreat the messengers. The king then sends servants into the streets to invite anyone they find, both good and bad, filling the hall.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Chief priests', 'Pharisees'],
        primaryRef: 'Matt 22:1-14',
        category: 'teaching',
      },
      {
        id: 'taxes-to-caesar',
        title: 'Paying Taxes to Caesar',
        description:
          'The Pharisees and Herodians try to trap Jesus with a question about paying taxes to Caesar. Jesus asks for a denarius, then delivers the famous reply: "Render to Caesar the things that are Caesar\'s, and to God the things that are God\'s."',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Pharisees', 'Herodians'],
        primaryRef: 'Matt 22:15-22',
        category: 'confrontation',
      },
      {
        id: 'sadducees-resurrection',
        title: 'Sadducees Question the Resurrection',
        description: 'The Sadducees posed a riddle about a woman married to seven brothers. Jesus answered: "In the resurrection they neither marry nor are given in marriage, but are like angels in heaven." He silenced them with Scripture.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Sadducees'],
        primaryRef: 'Matt 22:23-33',
        category: 'confrontation',
      },
      {
        id: 'greatest-commandment',
        title: 'The Greatest Commandment',
        description:
          'A scribe asks which commandment is the greatest. Jesus answers: "You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself."',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Scribe'],
        primaryRef: 'Matt 22:34-40',
        category: 'teaching',
      },
      {
        id: 'whose-son',
        title: '"Whose Son Is the Christ?"',
        description: 'Jesus asked how the Christ can be David\'s son if David calls him "Lord." No one could answer, and from that day no one dared ask him any more questions.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Pharisees'],
        primaryRef: 'Matt 22:41-46',
        category: 'teaching',
      },
      {
        id: 'seven-woes',
        title: 'Seven Woes Against the Pharisees',
        description: 'Jesus pronounced seven devastating "Woe to you, scribes and Pharisees, hypocrites!" judgments for their hypocrisy, then lamented over the city: "O Jerusalem, Jerusalem, the city that kills the prophets and stones those who are sent to it!"',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Pharisees', 'Scribes'],
        primaryRef: 'Matt 23:1-39',
        category: 'confrontation',
      },
      {
        id: 'widows-offering',
        title: "Widow's Offering",
        description:
          'Jesus watches people putting money into the Temple treasury. Many rich people give large amounts, but a poor widow puts in two small copper coins. Jesus tells His disciples she has given more than all the others, for she gave out of her poverty everything she had to live on.',
        location: 'Temple, Jerusalem',
        participants: ['Jesus', 'Disciples', 'Poor widow'],
        primaryRef: 'Mark 12:41-44',
        category: 'worship',
      },
      {
        id: 'olivet-discourse',
        title: 'Olivet Discourse',
        description:
          'Seated on the Mount of Olives, Jesus delivers His longest prophetic teaching to the disciples. He describes the destruction of the Temple, signs of the end of the age, the abomination of desolation, His second coming, and parables of readiness including the Ten Virgins and the Talents.',
        location: 'Mount of Olives',
        participants: ['Jesus', 'Peter', 'James', 'John', 'Andrew'],
        primaryRef: 'Matt 24-25',
        category: 'teaching',
      },
    ],
  },

  // ── Wednesday ────────────────────────────────────────────────
  {
    day: 'Wednesday',
    date: 'Nisan 13',
    theme: 'The Plot Thickens',
    color: '#f97316',
    events: [
      {
        id: 'judas-betrayal-agreement',
        title: 'Judas Agrees to Betray Jesus',
        description:
          'Judas Iscariot goes to the chief priests and asks, "What will you give me if I deliver him over to you?" They pay him thirty pieces of silver, fulfilling Zechariah 11:12-13. From that moment Judas seeks an opportunity to betray Jesus.',
        location: 'Jerusalem',
        participants: ['Judas Iscariot', 'Chief priests'],
        primaryRef: 'Matt 26:14-16',
        category: 'betrayal',
      },
      {
        id: 'anointing-at-bethany',
        title: 'Jesus Anointed at Bethany',
        description:
          'While Jesus is at the home of Simon the Leper in Bethany, a woman (identified in John as Mary, sister of Lazarus) pours an alabaster flask of very expensive ointment on His head. Jesus says she has prepared Him for burial and that her act will be told wherever the gospel is preached. (John places the meal six days before the Passover; Matthew and Mark recount it here as the backdrop to Judas\'s bargain.)',
        location: 'Bethany, house of Simon the Leper',
        participants: ['Jesus', 'Mary of Bethany', 'Simon the Leper', 'Disciples'],
        primaryRef: 'Matt 26:6-13',
        crossRefs: ['John 12:1-8'],
        category: 'worship',
      },
    ],
  },

  // ── Thursday ─────────────────────────────────────────────────
  {
    day: 'Thursday',
    date: 'Nisan 14',
    theme: 'The Last Supper',
    color: '#a78bfa',
    events: [
      {
        id: 'preparation-passover',
        title: 'Preparation of the Passover',
        description:
          'Jesus sends Peter and John to prepare the Passover meal. He tells them to follow a man carrying a jar of water to a house with a large upper room already furnished and ready.',
        location: 'Jerusalem',
        participants: ['Jesus', 'Peter', 'John'],
        primaryRef: 'Luke 22:7-13',
        crossRefs: ['Matt 26:17-19', 'Mark 14:12-16'],
        category: 'entry',
      },
      {
        id: 'washing-feet',
        title: "Washing of the Disciples' Feet",
        description:
          'Jesus rises from the supper, lays aside His outer garments, wraps a towel around His waist, and washes the disciples\' feet. Peter protests, but Jesus says, "If I do not wash you, you have no share with me." He teaches them that the greatest must serve.',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'The Twelve'],
        primaryRef: 'John 13:1-17',
        category: 'teaching',
      },
      {
        id: 'judas-identified',
        title: 'Jesus Identifies the Betrayer',
        description: 'During the meal, Jesus announced that one of the Twelve would betray him. He gave Judas the morsel of bread, saying "What you are going to do, do quickly." Judas went out, and it was night.',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'Judas', 'The Twelve'],
        primaryRef: 'John 13:21-30',
        crossRefs: ['Matt 26:20-25'],
        category: 'betrayal',
      },
      {
        id: 'last-supper',
        title: 'The Last Supper',
        description:
          'Jesus takes bread, gives thanks, breaks it and says, "This is my body, which is given for you. Do this in remembrance of me." Then He takes the cup saying, "This cup is the new covenant in my blood, which is poured out for many for the forgiveness of sins."',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'The Twelve'],
        primaryRef: 'Matt 26:26-29',
        crossRefs: ['Luke 22:14-20'],
        category: 'worship',
      },
      {
        id: 'new-commandment',
        title: 'The New Commandment',
        description: '"A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another. By this all people will know that you are my disciples, if you have love for one another."',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'Disciples'],
        primaryRef: 'John 13:34-35',
        category: 'teaching',
      },
      {
        id: 'predicts-peter-denial',
        title: "Jesus Predicts Peter's Denial",
        description:
          'Jesus tells the disciples they will all fall away. Peter insists he will never deny Jesus, even if he must die with Him. Jesus replies, "Truly, I tell you, this very night, before the rooster crows, you will deny me three times."',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'Peter'],
        primaryRef: 'Matt 26:31-35',
        category: 'teaching',
      },
      {
        id: 'upper-room-discourse',
        title: 'Upper Room Discourse',
        description:
          'Jesus delivers His most intimate teaching to the disciples. He promises the Holy Spirit, declares "I am the true vine," commands them to love one another, and warns of coming persecution. "In the world you will have tribulation. But take heart; I have overcome the world."',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'The Twelve'],
        primaryRef: 'John 14-16',
        category: 'teaching',
      },
      {
        id: 'high-priestly-prayer',
        title: 'High Priestly Prayer',
        description:
          'Jesus prays to the Father for Himself, for His disciples, and for all future believers. He prays for their unity, their sanctification in truth, and that the world may know that the Father sent Him and loved them even as He loved Jesus.',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus'],
        primaryRef: 'John 17',
        category: 'worship',
      },
      {
        id: 'agony-gethsemane',
        title: 'Agony in Gethsemane',
        description:
          'In the Garden of Gethsemane, Jesus prays in great anguish: "My Father, if it be possible, let this cup pass from me; nevertheless, not as I will, but as you will." His sweat becomes like drops of blood. He finds the disciples sleeping three times.',
        location: 'Garden of Gethsemane',
        participants: ['Jesus', 'Peter', 'James', 'John'],
        primaryRef: 'Matt 26:36-46',
        crossRefs: ['Luke 22:39-46'],
        category: 'suffering',
      },
      {
        id: 'betrayal-arrest',
        title: 'Betrayal and Arrest',
        description:
          'Judas arrives with a large crowd armed with swords and clubs, sent by the chief priests and elders. He betrays Jesus with a kiss. Peter draws a sword and cuts off the ear of the high priest\'s servant, but Jesus heals it and rebukes violence: "All who draw the sword will die by the sword."',
        location: 'Garden of Gethsemane',
        participants: ['Jesus', 'Judas Iscariot', 'Temple guards', 'Peter', 'Malchus'],
        primaryRef: 'Matt 26:47-56',
        crossRefs: ['John 18:1-12'],
        category: 'betrayal',
      },
      {
        id: 'trial-annas',
        title: 'Trial Before Annas',
        description: 'After arrest, Jesus was taken first to Annas, the former high priest and father-in-law of Caiaphas. Annas questioned Jesus about his disciples and his teaching before sending him bound to Caiaphas.',
        location: 'House of Annas, Jerusalem',
        participants: ['Jesus', 'Annas'],
        primaryRef: 'John 18:13-14, 19-24',
        category: 'trial',
      },
      {
        id: 'trial-before-caiaphas',
        title: 'Trial before Caiaphas and the Sanhedrin',
        description:
          'Jesus is brought before the high priest Caiaphas and the assembled Sanhedrin. False witnesses testify against Him. When asked if He is the Christ, Jesus answers, "You have said so. But I tell you, from now on you will see the Son of Man seated at the right hand of Power." They condemn Him as deserving death.',
        location: "Caiaphas's Palace, Jerusalem",
        participants: ['Jesus', 'Caiaphas', 'Sanhedrin', 'False witnesses'],
        primaryRef: 'Matt 26:57-68',
        category: 'trial',
      },
      {
        id: 'peter-denials',
        title: "Peter's Three Denials",
        description:
          'While Jesus is on trial, Peter waits in the courtyard. Three times he is identified as one of Jesus\' followers, and three times he denies it, the third time with cursing and swearing. Immediately the rooster crows, and Peter remembers Jesus\' words. He goes out and weeps bitterly.',
        location: "Courtyard of Caiaphas's Palace",
        participants: ['Peter', 'Servant girls', 'Bystanders'],
        primaryRef: 'Matt 26:69-75',
        crossRefs: ['Luke 22:54-62'],
        category: 'betrayal',
      },
    ],
  },

  // ── Friday ───────────────────────────────────────────────────
  {
    day: 'Friday',
    date: 'Nisan 15',
    theme: 'The Crucifixion',
    color: '#dc2626',
    events: [
      {
        id: 'trial-before-pilate',
        title: 'Trial before Pilate',
        description:
          'Jesus is brought before Pontius Pilate. Pilate finds no fault in Him and attempts to release Him, but the crowd demands crucifixion. Pilate washes his hands, saying "I am innocent of this man\'s blood." The people answer, "His blood be on us and on our children!"',
        location: "Pilate's Praetorium, Jerusalem",
        participants: ['Jesus', 'Pontius Pilate', 'Chief priests', 'Crowds'],
        primaryRef: 'Matt 27:1-2, 11-26',
        crossRefs: ['John 18:28-19:16'],
        category: 'trial',
      },
      {
        id: 'herod-trial',
        title: 'Jesus Sent to Herod Antipas',
        description: 'Pilate sent Jesus to Herod Antipas, who had long wanted to see him. Herod questioned Jesus at length, but Jesus gave no answer. Herod and his soldiers mocked him, dressed him in splendid clothing, and sent him back to Pilate.',
        location: "Herod's Palace, Jerusalem",
        participants: ['Jesus', 'Herod Antipas'],
        primaryRef: 'Luke 23:6-12',
        category: 'trial',
      },
      {
        id: 'judas-death',
        title: 'Judas Returns Silver and Hangs Himself',
        description:
          'Seized with remorse, Judas returns the thirty pieces of silver to the chief priests saying, "I have sinned by betraying innocent blood." They reply, "What is that to us? See to it yourself." He throws the silver into the Temple and goes away and hangs himself.',
        location: 'Temple, Jerusalem / Field of Blood',
        participants: ['Judas Iscariot', 'Chief priests'],
        primaryRef: 'Matt 27:3-10',
        category: 'death',
      },
      {
        id: 'barabbas-released',
        title: 'Barabbas Released',
        description:
          'Following the custom of releasing a prisoner at Passover, Pilate offers the crowd a choice between Jesus and Barabbas, a notorious prisoner. Stirred up by the chief priests, the crowd demands Barabbas be released and Jesus crucified.',
        location: "Pilate's Praetorium, Jerusalem",
        participants: ['Pontius Pilate', 'Barabbas', 'Chief priests', 'Crowds'],
        primaryRef: 'Matt 27:15-26',
        category: 'trial',
      },
      {
        id: 'scourging-crown-of-thorns',
        title: 'Scourging and Crown of Thorns',
        description:
          'The soldiers strip Jesus, put a scarlet robe on Him, twist together a crown of thorns and press it on His head, and place a staff in His right hand. They kneel before Him in mockery, saying "Hail, King of the Jews!" and spit on Him and strike Him.',
        location: "Pilate's Praetorium, Jerusalem",
        participants: ['Jesus', 'Roman soldiers'],
        primaryRef: 'Matt 27:27-31',
        crossRefs: ['John 19:1-3'],
        category: 'suffering',
      },
      {
        id: 'simon-carries-cross',
        title: 'Simon Carries the Cross',
        description:
          'As Jesus is led out to be crucified, the soldiers compel Simon of Cyrene, a passerby coming in from the country, to carry His cross. A large number of people follow, including women who mourn and wail for Him.',
        location: 'Via Dolorosa, Jerusalem',
        participants: ['Jesus', 'Simon of Cyrene', 'Roman soldiers'],
        primaryRef: 'Matt 27:32',
        crossRefs: ['Luke 23:26'],
        category: 'suffering',
      },
      {
        id: 'crucifixion',
        title: 'Crucifixion at Golgotha',
        description:
          'Jesus is crucified at the Place of the Skull between two criminals. The soldiers cast lots for His garments. Above His head the charge reads: "This is Jesus, the King of the Jews." Those passing by hurl insults; the chief priests mock Him: "He saved others; He cannot save himself."',
        location: 'Golgotha (Calvary)',
        participants: ['Jesus', 'Two criminals', 'Roman soldiers', 'Mary (mother of Jesus)', 'John'],
        primaryRef: 'Matt 27:33-44',
        crossRefs: ['John 19:17-27'],
        category: 'death',
      },
      {
        id: 'father-forgive',
        title: '"Father, Forgive Them"',
        description: 'As they crucified him, Jesus prayed: "Father, forgive them, for they know not what they do." The soldiers cast lots to divide his garments.',
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'Luke 23:34',
        category: 'suffering',
      },
      {
        id: 'two-thieves',
        title: 'The Two Thieves',
        description: 'One criminal mocked Jesus, but the other rebuked him and said, "Jesus, remember me when you come into your kingdom." Jesus replied: "Truly, I say to you, today you will be with me in paradise."',
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'Luke 23:39-43',
        category: 'suffering',
      },
      {
        id: 'woman-behold-son',
        title: '"Woman, Behold Your Son"',
        description: 'Seeing his mother and the beloved disciple at the cross, Jesus said to Mary: "Woman, behold, your son!" and to the disciple: "Behold, your mother!" From that hour the disciple took her into his home.',
        location: 'Golgotha',
        participants: ['Jesus', 'Mary', 'John'],
        primaryRef: 'John 19:26-27',
        category: 'suffering',
      },
      {
        id: 'darkness',
        title: 'Darkness from Noon to 3pm',
        description:
          'From the sixth hour to the ninth hour (noon to 3pm), darkness falls over all the land. Creation itself groans as the Son of God bears the sins of the world on the cross.',
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'Matt 27:45',
        category: 'death',
      },
      {
        id: 'i-thirst',
        title: '"I Thirst"',
        description: 'Jesus said, "I thirst." A jar full of sour wine stood there, so they put a sponge full of sour wine on a hyssop branch and held it to his mouth.',
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'John 19:28-29',
        category: 'suffering',
      },
      {
        id: 'death-of-jesus',
        title: '"It Is Finished" -- Death of Jesus',
        description:
          'Jesus cries out, "Eli, Eli, lema sabachthani?" -- "My God, my God, why have you forsaken me?" Then, knowing that all is accomplished, He says "It is finished" and gives up His spirit. The atoning sacrifice is complete.',
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'Matt 27:46-50',
        crossRefs: ['John 19:30'],
        category: 'death',
      },
      {
        id: 'temple-veil-torn',
        title: 'Temple Veil Torn Top to Bottom',
        description:
          'At the moment of Jesus\' death, the curtain of the Temple is torn in two from top to bottom. The earth shakes and rocks split. Tombs break open and the bodies of many saints are raised. The way into the presence of God is now open to all.',
        location: 'Temple, Jerusalem',
        participants: [],
        primaryRef: 'Matt 27:51-53',
        category: 'miracle',
      },
      {
        id: 'centurion-confession',
        title: "Centurion's Confession",
        description:
          'When the centurion and those guarding Jesus see the earthquake and all that happens, they are terrified and exclaim, "Truly this was the Son of God!" Even a Roman soldier recognizes what the religious leaders refused to see.',
        location: 'Golgotha',
        participants: ['Roman centurion', 'Guards'],
        primaryRef: 'Matt 27:54',
        category: 'worship',
      },
      {
        id: 'side-pierced',
        title: 'The Piercing of His Side',
        description: "A soldier pierced Jesus' side with a spear, and at once there came out blood and water — fulfilling Scripture that not a bone of him would be broken, and \"They will look on him whom they have pierced.\"",
        location: 'Golgotha',
        participants: ['Jesus'],
        primaryRef: 'John 19:34',
        crossRefs: ['Zech 12:10', 'Ps 34:20'],
        category: 'death',
      },
      {
        id: 'burial',
        title: 'Burial by Joseph of Arimathea',
        description:
          'Joseph of Arimathea, a wealthy disciple who had been a secret follower of Jesus, asks Pilate for the body. He wraps it in clean linen cloth and places it in his own new tomb cut in the rock. Nicodemus brings seventy-five pounds of myrrh and aloes. A great stone is rolled across the entrance.',
        location: 'Garden Tomb, near Golgotha',
        participants: ['Joseph of Arimathea', 'Nicodemus', 'Mary Magdalene', 'Mary mother of Joses'],
        primaryRef: 'Matt 27:57-60',
        crossRefs: ['John 19:38-42'],
        category: 'burial',
      },
    ],
  },

  // ── Saturday ─────────────────────────────────────────────────
  {
    day: 'Saturday',
    date: 'Nisan 16',
    theme: 'The Silence',
    color: '#57534e',
    events: [
      {
        id: 'jesus-in-tomb',
        title: 'Jesus in the Tomb',
        description:
          'The body of Jesus lies in the sealed tomb. It is the Sabbath. The disciples are scattered, grieving, and afraid. All hope seems lost. Yet unseen by human eyes, the Scriptures are being fulfilled.',
        location: 'Garden Tomb',
        participants: [],
        primaryRef: 'Matt 27:59-60',
        category: 'burial',
      },
      {
        id: 'guards-posted',
        title: 'Guards Posted at the Tomb',
        description:
          'The chief priests and Pharisees go to Pilate, asking for the tomb to be secured. They remember Jesus said, "After three days I will rise." Pilate provides a guard, and they seal the stone and post soldiers -- unwittingly ensuring that the resurrection would be indisputable.',
        location: 'Garden Tomb',
        participants: ['Chief priests', 'Pharisees', 'Pontius Pilate', 'Roman guards'],
        primaryRef: 'Matt 27:62-66',
        category: 'burial',
      },
      {
        id: 'world-waits',
        title: 'The World Waits',
        description:
          'Heaven is silent. The disciples hide behind locked doors. The women, having prepared spices before sundown, rest according to the commandment. All creation holds its breath between the cross and the empty tomb. Saturday is the day between the worst thing that has ever happened and the best thing that will ever happen.',
        location: 'Jerusalem',
        participants: ['Disciples', 'Women followers'],
        primaryRef: 'Luke 23:56',
        category: 'burial',
      },
    ],
  },

  // ── Resurrection Sunday ──────────────────────────────────────
  {
    day: 'Resurrection Sunday',
    date: 'Nisan 17',
    theme: 'He Is Risen!',
    color: '#22c55e',
    events: [
      {
        id: 'earthquake-angel',
        title: 'Earthquake; Angel Rolls the Stone Away',
        description:
          'There is a violent earthquake as an angel of the Lord descends from heaven, rolls back the stone, and sits on it. His appearance is like lightning, his clothes white as snow. The guards shake with fear and become like dead men.',
        location: 'Garden Tomb',
        participants: ['Angel of the Lord', 'Roman guards'],
        primaryRef: 'Matt 28:2-4',
        category: 'resurrection',
      },
      {
        id: 'women-empty-tomb',
        title: 'Women Find the Empty Tomb',
        description:
          'Mary Magdalene, Mary the mother of James, and Salome come to the tomb at dawn. They find the stone rolled away and the tomb empty. The angel tells them, "Do not be afraid, for I know that you seek Jesus who was crucified. He is not here, for he has risen, as he said."',
        location: 'Garden Tomb',
        participants: ['Mary Magdalene', 'Mary mother of James', 'Salome', 'Angels'],
        primaryRef: 'Matt 28:1-8',
        crossRefs: ['Mark 16:1-8'],
        category: 'resurrection',
      },
      {
        id: 'appears-to-women',
        title: 'Jesus Appears to the Women',
        description: 'Jesus met the women on the road and greeted them. They came up, took hold of his feet, and worshiped him. He said, "Do not be afraid; go and tell my brothers to go to Galilee, and there they will see me." (Matthew names Mary Magdalene and "the other Mary"; John records Mary Magdalene\'s own encounter at the tomb separately.)',
        location: 'Near the Tomb',
        participants: ['Jesus', 'Mary Magdalene', 'Mary mother of James'],
        primaryRef: 'Matt 28:9-10',
        category: 'resurrection',
      },
      {
        id: 'peter-john-run',
        title: 'Peter and John Run to the Tomb',
        description:
          'Peter and John race to the tomb. John arrives first and sees the linen cloths lying there but does not go in. Peter enters and sees the cloths and the face cloth folded separately. John then enters and sees and believes.',
        location: 'Garden Tomb',
        participants: ['Peter', 'John'],
        primaryRef: 'John 20:3-10',
        category: 'resurrection',
      },
      {
        id: 'appears-to-mary',
        title: 'Jesus Appears to Mary Magdalene',
        description:
          'Mary Magdalene stands weeping outside the tomb. Jesus appears to her but she does not recognize Him until He speaks her name: "Mary." She cries out "Rabboni!" (Teacher). Jesus tells her, "Go to my brothers and say to them, I am ascending to my Father and your Father."',
        location: 'Garden Tomb',
        participants: ['Jesus', 'Mary Magdalene'],
        primaryRef: 'John 20:11-18',
        category: 'resurrection',
      },
      {
        id: 'road-to-emmaus',
        title: 'Road to Emmaus',
        description:
          'Two disciples walk to Emmaus, talking about all that has happened. Jesus joins them but they do not recognize Him. He explains from Moses and all the Prophets how the Christ had to suffer and enter His glory. Their eyes are opened when He breaks bread, and He vanishes from their sight.',
        location: 'Road to Emmaus',
        participants: ['Jesus', 'Cleopas', 'Unnamed disciple'],
        primaryRef: 'Luke 24:13-35',
        category: 'resurrection',
      },
      {
        id: 'appears-to-disciples',
        title: 'Jesus Appears to the Disciples',
        description:
          'That evening, Jesus appears to the disciples behind locked doors, saying "Peace be with you." He shows them His hands and side. The disciples are overjoyed. He breathes on them and says, "Receive the Holy Spirit." He is risen! He is risen indeed!',
        location: 'Upper Room, Jerusalem',
        participants: ['Jesus', 'The Disciples (Thomas absent)'],
        primaryRef: 'John 20:19-23',
        crossRefs: ['Luke 24:36-49'],
        category: 'resurrection',
      },
      {
        id: 'guards-report',
        title: "The Guards' Report",
        description: 'The guards reported to the chief priests what had happened. They were given a large sum of money and told to say, "His disciples came by night and stole him away while we were asleep." This story has been spread among the Jews to this day.',
        location: 'Jerusalem',
        participants: ['Guards', 'Chief Priests'],
        primaryRef: 'Matt 28:11-15',
        category: 'confrontation',
      },
    ],
  },
];
