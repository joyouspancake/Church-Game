export interface Question {
  id: number;
  type: 'multiple_choice' | 'true_false' | 'who_said_this' | 'finish_the_verse' | 'character_trivia';
  question: string;
  options: string[];
  correctOptionIndex: number;
  reference: string;
  explanation?: string;
}

export const GENESIS_QUESTIONS: Question[] = [
  // --- CREATION & GARDEN (Genesis 1-2) ---
  {
    id: 1,
    type: 'multiple_choice',
    question: 'What did God create on the very first day?',
    options: ['Land and plants', 'Light', 'Sun, moon, and stars', 'Sky and water'],
    correctOptionIndex: 1,
    reference: 'Genesis 1:3-5',
    explanation: 'God said, "Let there be light," and there was light, separating light from darkness on Day 1.'
  },
  {
    id: 2,
    type: 'true_false',
    question: 'True or False: God created the sun and moon on the third day.',
    options: ['True', 'False'],
    correctOptionIndex: 1,
    reference: 'Genesis 1:14-19',
    explanation: 'God created the sun, moon, and stars on the fourth day, not the third.'
  },
  {
    id: 3,
    type: 'multiple_choice',
    question: 'What was the source of water that irrigated the ground before rain fell?',
    options: ['No water at all', 'A morning mist or spring that rose from the earth', 'A massive storm', 'Underground rivers from Eden'],
    correctOptionIndex: 1,
    reference: 'Genesis 2:5-6',
    explanation: 'A stream or mist went up from the earth and watered the whole face of the ground.'
  },
  {
    id: 4,
    type: 'multiple_choice',
    question: 'From what material did the LORD God form the first man, Adam?',
    options: ['The dust of the ground', 'A rib from an angel', 'Clay from the river Euphrates', 'Spiritual energy and light'],
    correctOptionIndex: 0,
    reference: 'Genesis 2:7',
    explanation: 'The LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life.'
  },
  {
    id: 5,
    type: 'multiple_choice',
    question: 'Which four rivers branched out from the river flowing out of the Garden of Eden?',
    options: [
      'Pishon, Gihon, Tigris, and Euphrates',
      'Nile, Jordan, Euphrates, and Tigris',
      'Pishon, Jordan, Amazon, and Euphrates',
      'Gihon, Nile, Euphrates, and Tiber'
    ],
    correctOptionIndex: 0,
    reference: 'Genesis 2:10-14',
    explanation: 'The river divided and became four rivers: Pishon, Gihon, Hiddekel (Tigris), and Euphrates.'
  },
  {
    id: 6,
    type: 'character_trivia',
    question: 'Why was the first woman called "Woman" when she was first created?',
    options: [
      'Because she was the mother of all living',
      'Because she was taken out of Man',
      'Because she was smarter than the man',
      'Because she loved the garden flowers'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 2:23',
    explanation: 'Adam said, "She shall be called Woman, because she was taken out of Man."'
  },

  // --- THE FALL & EXPULSION (Genesis 3) ---
  {
    id: 7,
    type: 'who_said_this',
    question: 'Who said: "You will not surely die. For God knows that in the day you eat of it your eyes will be opened..."?',
    options: ['The LORD God', 'Adam', 'The Serpent', 'An angel of the Lord'],
    correctOptionIndex: 2,
    reference: 'Genesis 3:4-5',
    explanation: 'The serpent tempted Eve by stating she would not die and would become like God, knowing good and evil.'
  },
  {
    id: 8,
    type: 'multiple_choice',
    question: 'What did Adam and Eve sew together to cover their nakedness after eating the fruit?',
    options: ['Palm branches', 'Sheepskins', 'Fig leaves', 'Linen cloths'],
    correctOptionIndex: 2,
    reference: 'Genesis 3:7',
    explanation: 'They sewed fig leaves together and made themselves coverings.'
  },
  {
    id: 9,
    type: 'who_said_this',
    question: 'Who said: "I heard your voice in the garden, and I was afraid because I was naked; and I hid myself"?',
    options: ['Eve', 'The Serpent', 'Adam', 'Cain'],
    correctOptionIndex: 2,
    reference: 'Genesis 3:10',
    explanation: 'Adam answered God when called, explaining that fear of his nakedness drove him to hide.'
  },
  {
    id: 10,
    type: 'multiple_choice',
    question: 'What was the serpent cursed to eat all the days of its life?',
    options: ['Bitter grass', 'Dust', 'Insects of the field', 'Nothing, it was forbidden to eat'],
    correctOptionIndex: 1,
    reference: 'Genesis 3:14',
    explanation: 'God cursed the serpent to crawl on its belly and eat dust all the days of its life.'
  },
  {
    id: 11,
    type: 'finish_the_verse',
    question: 'Finish the verse: "...for dust you are, and to ________ you shall return."',
    options: ['ashes', 'clay', 'dust', 'nothingness'],
    correctOptionIndex: 2,
    reference: 'Genesis 3:19',
    explanation: 'God told Adam that physical labor would be difficult until he returned to the ground, "for dust you are, and to dust you shall return."'
  },
  {
    id: 12,
    type: 'multiple_choice',
    question: 'What did God place at the east of the Garden of Eden to guard the way to the Tree of Life?',
    options: ['A wall of fire', 'Cherubim and a flaming sword which turned every way', 'Twelve mighty angels with spears', 'A high mountain barrier'],
    correctOptionIndex: 1,
    reference: 'Genesis 3:24',
    explanation: 'He drove out the man and placed Cherubim and a flaming sword at the east of the garden.'
  },

  // --- CAIN, ABEL, & SETH (Genesis 4-5) ---
  {
    id: 13,
    type: 'multiple_choice',
    question: 'What were the occupations of brothers Cain and Abel?',
    options: [
      'Cain was a hunter; Abel was a fisherman',
      'Cain was a builder; Abel was a metalworker',
      'Cain was a tiller of the ground; Abel was a keeper of sheep',
      'Cain was a keeper of sheep; Abel was a tiller of the ground'
    ],
    correctOptionIndex: 2,
    reference: 'Genesis 4:2',
    explanation: 'Abel was a keeper of sheep, and Cain was a tiller of the ground.'
  },
  {
    id: 14,
    type: 'who_said_this',
    question: 'Who said: "Am I my brother\'s keeper?"',
    options: ['Abel', 'Seth', 'Cain', 'Methuselah'],
    correctOptionIndex: 2,
    reference: 'Genesis 4:9',
    explanation: 'Cain replied with this famous defensive remark when God asked him where Abel was.'
  },
  {
    id: 15,
    type: 'multiple_choice',
    question: 'In what land did Cain live after being banished by God for killing Abel?',
    options: ['The Land of Nod', 'The Land of Canaan', 'The Desert of Shur', 'The plains of Shinar'],
    correctOptionIndex: 0,
    reference: 'Genesis 4:16',
    explanation: 'Cain went out from the presence of the LORD and dwelt in the land of Nod, east of Eden.'
  },
  {
    id: 16,
    type: 'character_trivia',
    question: 'Who was the son born to Adam and Eve who "replaced" Abel?',
    options: ['Enoch', 'Jared', 'Seth', 'Lamech'],
    correctOptionIndex: 2,
    reference: 'Genesis 4:25',
    explanation: 'Eve named him Seth, saying, "God has appointed another seed for me instead of Abel, whom Cain killed."'
  },
  {
    id: 17,
    type: 'character_trivia',
    question: 'Who is recorded as having lived the longest life in Genesis, dying at 969 years old?',
    options: ['Noah', 'Methuselah', 'Adam', 'Jared'],
    correctOptionIndex: 1,
    reference: 'Genesis 5:27',
    explanation: 'All the days of Methuselah were nine hundred and sixty-nine years, and he died.'
  },
  {
    id: 18,
    type: 'true_false',
    question: 'True or False: Enoch died of old age at 365 years old.',
    options: ['True', 'False'],
    correctOptionIndex: 1,
    reference: 'Genesis 5:24',
    explanation: 'False. Enoch "walked with God; and he was not, for God took him." He did not experience normal physical death.'
  },

  // --- NOAH & THE FLOOD (Genesis 6-9) ---
  {
    id: 19,
    type: 'multiple_choice',
    question: 'What kind of wood did God command Noah to use to build the Ark?',
    options: ['Cedar wood', 'Gopher wood', 'Oak wood', 'Olive wood'],
    correctOptionIndex: 1,
    reference: 'Genesis 6:14',
    explanation: 'God explicitly commanded Noah, "Make yourself an ark of gopher wood."'
  },
  {
    id: 20,
    type: 'multiple_choice',
    question: 'Who were the three sons of Noah?',
    options: [
      'Shem, Ham, and Japheth',
      'Cain, Abel, and Seth',
      'Abraham, Nahor, and Haran',
      'Reuben, Simeon, and Levi'
    ],
    correctOptionIndex: 0,
    reference: 'Genesis 6:10',
    explanation: 'Noah begot three sons: Shem, Ham, and Japheth.'
  },
  {
    id: 21,
    type: 'multiple_choice',
    question: 'For how many days and nights did rain fall on the earth during the great flood?',
    options: ['7 days and 7 nights', '40 days and 40 nights', '150 days and nights', '100 days and nights'],
    correctOptionIndex: 1,
    reference: 'Genesis 7:12',
    explanation: 'And the rain was on the earth forty days and forty nights.'
  },
  {
    id: 22,
    type: 'multiple_choice',
    question: 'On what mountain range did Noah\'s Ark rest when the floodwaters receded?',
    options: ['Mount Sinai', 'Mount Nebo', 'The Mountains of Ararat', 'Mount Carmel'],
    correctOptionIndex: 2,
    reference: 'Genesis 8:4',
    explanation: 'Then the ark rested in the seventh month, on the seventeenth day of the month, on the mountains of Ararat.'
  },
  {
    id: 23,
    type: 'multiple_choice',
    question: 'Which bird did Noah first send out of the Ark to see if the water had dried up?',
    options: ['A Dove', 'A Raven', 'An Eagle', 'A Sparrow'],
    correctOptionIndex: 1,
    reference: 'Genesis 8:6-7',
    explanation: 'Noah first sent out a raven, which kept going to and fro until the waters had dried up from the earth.'
  },
  {
    id: 24,
    type: 'multiple_choice',
    question: 'What did the dove bring back in its beak on its second journey, showing that waters had receded?',
    options: ['A grain of wheat', 'A freshly plucked olive leaf', 'A fig branch', 'A piece of river grass'],
    correctOptionIndex: 1,
    reference: 'Genesis 8:11',
    explanation: 'The dove returned in the evening, and behold, a freshly plucked olive leaf was in her mouth.'
  },
  {
    id: 25,
    type: 'multiple_choice',
    question: 'What physical sign did God establish in the sky as a token of His covenant to never flood the earth again?',
    options: ['A solar eclipse', 'A brilliant shooting star', 'A rainbow', 'A golden cloud'],
    correctOptionIndex: 2,
    reference: 'Genesis 9:13',
    explanation: 'God said, "I set My rainbow in the cloud, and it shall be for the sign of the covenant between Me and the earth."'
  },

  // --- BABEL & ABRAM'S CALLING (Genesis 11-12) ---
  {
    id: 26,
    type: 'multiple_choice',
    question: 'In which plain did the people gather to build a city and a tower that would reach to heaven?',
    options: ['The plain of Shinar', 'The plain of Jordan', 'The valley of Mamre', 'The oasis of Kadesh'],
    correctOptionIndex: 0,
    reference: 'Genesis 11:2-4',
    explanation: 'They found a plain in the land of Shinar and dwelt there, starting the construction of the Tower of Babel.'
  },
  {
    id: 27,
    type: 'true_false',
    question: 'True or False: Abram\'s native home, from which his father Terah originally set out, was Ur of the Chaldeans.',
    options: ['True', 'False'],
    correctOptionIndex: 0,
    reference: 'Genesis 11:31',
    explanation: 'They went out together from Ur of the Chaldeans to go to the land of Canaan.'
  },
  {
    id: 28,
    type: 'multiple_choice',
    question: 'How old was Abram when God called him in Haran and told him to depart to a land He would show him?',
    options: ['50 years old', '75 years old', '99 years old', '100 years old'],
    correctOptionIndex: 1,
    reference: 'Genesis 12:4',
    explanation: 'Abram was seventy-five years old when he departed from Haran.'
  },
  {
    id: 29,
    type: 'multiple_choice',
    question: 'Why did Abram and Sarai travel to Egypt shortly after arriving in Canaan?',
    options: ['There was a severe famine in the land of Canaan', 'They wanted to buy horses', 'Abram was invited by Pharaoh', 'Canaanite kings drove them out'],
    correctOptionIndex: 0,
    reference: 'Genesis 12:10',
    explanation: 'Now there was a famine in the land, and Abram went down to Egypt to dwell there.'
  },
  {
    id: 30,
    type: 'character_trivia',
    question: 'What relation was Lot to Abram?',
    options: ['His son', 'His brother', 'His nephew (brother\'s son)', 'His cousin'],
    correctOptionIndex: 2,
    reference: 'Genesis 12:5',
    explanation: 'Lot was Abram\'s nephew, the son of Abram\'s deceased brother Haran.'
  },

  // --- ABRAM & LOT, COVENANT (Genesis 13-15) ---
  {
    id: 31,
    type: 'multiple_choice',
    question: 'When Abram and Lot agreed to separate because the land could not hold their livestock, which direction did Lot choose?',
    options: [
      'He chose the rugged mountains of Gilead',
      'He chose the plain of Jordan toward Sodom',
      'He chose the Mediterranean coastline',
      'He chose the southern desert of Negev'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 13:10-12',
    explanation: 'Lot lifted his eyes and saw all the plain of Jordan, that it was well watered... Lot chose the plain of Jordan and pitched his tent toward Sodom.'
  },
  {
    id: 32,
    type: 'character_trivia',
    question: 'Who was Melchizedek, who blessed Abram after he rescued Lot from captivity?',
    options: [
      'The King of Sodom and a commander of armies',
      'The King of Salem and Priest of the Most High God',
      'Abram\'s chief household servant',
      'A nomadic chieftain from Egypt'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 14:18',
    explanation: 'Melchizedek king of Salem brought out bread and wine; he was the priest of God Most High.'
  },
  {
    id: 33,
    type: 'multiple_choice',
    question: 'What percentage of the spoils did Abram give to Priest-King Melchizedek?',
    options: ['A half (50%)', 'A fifth (20%)', 'A tithe (10%)', 'Nothing, Melchizedek gave him gifts'],
    correctOptionIndex: 2,
    reference: 'Genesis 14:20',
    explanation: 'Abram gave him a tithe (a tenth) of all the spoils.'
  },
  {
    id: 34,
    type: 'finish_the_verse',
    question: 'Complete the statement in Genesis 15:6: "And he [Abram] believed in the LORD, and He accounted it to him for ________."',
    options: ['holiness', 'righteousness', 'good luck', 'a blessing'],
    correctOptionIndex: 1,
    reference: 'Genesis 15:6',
    explanation: 'This central verse states: "And he believed in the LORD, and He accounted it to him for righteousness."'
  },
  {
    id: 35,
    type: 'multiple_choice',
    question: 'In Genesis 15, God prophesied that Abram\'s descendants would be strangers in a land that is not theirs and be afflicted for how many years?',
    options: ['70 years', '120 years', '400 years', '1000 years'],
    correctOptionIndex: 2,
    reference: 'Genesis 15:13',
    explanation: 'God told Abram that his descendants would be afflicted in a foreign land for four hundred years.'
  },

  // --- HAGAR, ANGLE OF LORD, CIRCUMCISION (Genesis 16-17) ---
  {
    id: 36,
    type: 'character_trivia',
    question: 'What was the nationality of Sarai\'s maidservant, Hagar?',
    options: ['Canaanite', 'Egyptian', 'Babylonian', 'Philistine'],
    correctOptionIndex: 1,
    reference: 'Genesis 16:1',
    explanation: 'Sarai had an Egyptian maidservant whose name was Hagar.'
  },
  {
    id: 37,
    type: 'multiple_choice',
    question: 'What was the name of the son Hagar bore to Abram?',
    options: ['Isaac', 'Ishmael', 'Edom', 'Midian'],
    correctOptionIndex: 1,
    reference: 'Genesis 16:15',
    explanation: 'Hagar bore Abram a son, and Abram named his son, whom Hagar bore, Ishmael.'
  },
  {
    id: 38,
    type: 'multiple_choice',
    question: 'How old was Abram when the LORD changed his name to Abraham?',
    options: ['75 years old', '85 years old', '99 years old', '100 years old'],
    correctOptionIndex: 2,
    reference: 'Genesis 17:1-5',
    explanation: 'When Abram was ninety-nine years old, the LORD appeared and changed his name to Abraham ("father of many nations").'
  },
  {
    id: 39,
    type: 'multiple_choice',
    question: 'What physical sign did God command Abraham to implement as a token of the covenant for all males?',
    options: ['Anointing with oil', 'A special physical mark on the forehead', 'Circumcision', 'Washing of feet'],
    correctOptionIndex: 2,
    reference: 'Genesis 17:10-11',
    explanation: 'God instituted circumcision on the eighth day for every male child as the covenant sign.'
  },
  {
    id: 40,
    type: 'character_trivia',
    question: 'What was Sarah\'s reaction when she overheard the visitor say she would have a baby in her old age?',
    options: ['She wept bitterly', 'She laughed to herself', 'She shouted praises to God', 'She ran out into the fields in anger'],
    correctOptionIndex: 1,
    reference: 'Genesis 18:12',
    explanation: 'Sarah laughed within herself, saying, "After I have grown old, shall I have pleasure, my lord being old also?"'
  },

  // --- SODOM, GOMORRAH, LOT\'S WIFE (Genesis 18-19) ---
  {
    id: 41,
    type: 'multiple_choice',
    question: 'In Abraham\'s bargaining with God over Sodom, what was the lowest number of righteous people for which God promised not to destroy the city?',
    options: ['Fifty', 'Twenty', 'Ten', 'Five'],
    correctOptionIndex: 2,
    reference: 'Genesis 18:32',
    explanation: 'Abraham finally bargained down to ten righteous, and God said, "I will not destroy it for the sake of ten."'
  },
  {
    id: 42,
    type: 'multiple_choice',
    question: 'How many angels came to Sodom in the evening to warn Lot to flee?',
    options: ['One angel', 'Two angels', 'Three angels', 'A host of angels'],
    correctOptionIndex: 1,
    reference: 'Genesis 19:1',
    explanation: 'Now the two angels came to Sodom in the evening, and Lot was sitting in the gate of Sodom.'
  },
  {
    id: 43,
    type: 'multiple_choice',
    question: 'What did the angels do to the aggressive men at Lot\'s door to protect the household?',
    options: ['Struck them with blindness', 'Struck them with lightning', 'Opened a sinkhole in the street', 'Devoured them with flame'],
    correctOptionIndex: 0,
    reference: 'Genesis 19:11',
    explanation: 'They struck the men who were at the doorway of the house with blindness, both small and great.'
  },
  {
    id: 44,
    type: 'multiple_choice',
    question: 'What happened to Lot\'s wife when she looked back at Sodom during their escape?',
    options: ['She became blind', 'She was struck by debris', 'She became a pillar of salt', 'She was lost in the smoke'],
    correctOptionIndex: 2,
    reference: 'Genesis 19:26',
    explanation: 'But his wife looked back from behind him, and she became a pillar of salt.'
  },
  {
    id: 45,
    type: 'multiple_choice',
    question: 'What was the name of the small town Lot fled to when Sodom was being consumed by fire?',
    options: ['Zoar', 'Bethel', 'Hebron', 'Beersheba'],
    correctOptionIndex: 0,
    reference: 'Genesis 19:22-23',
    explanation: 'The town was called Zoar, which means "small" or "insignificant".'
  },

  // --- BIRTH AND SACRIFICE OF ISAAC (Genesis 20-22) ---
  {
    id: 46,
    type: 'multiple_choice',
    question: 'What does the name "Isaac" mean in Hebrew?',
    options: ['Righteous father', 'Laughter', 'Answered prayer', 'God will provide'],
    correctOptionIndex: 1,
    reference: 'Genesis 21:6',
    explanation: 'Isaac means "he laughs" or "laughter," reminding of Abraham and Sarah\'s reaction.'
  },
  {
    id: 47,
    type: 'multiple_choice',
    question: 'How old was Abraham when his son Isaac was born?',
    options: ['75 years old', '99 years old', '100 years old', '120 years old'],
    correctOptionIndex: 2,
    reference: 'Genesis 21:5',
    explanation: 'Now Abraham was one hundred years old when his son Isaac was born to him.'
  },
  {
    id: 48,
    type: 'multiple_choice',
    question: 'Where did God send Abraham to offer Isaac as a burnt offering?',
    options: ['Mount Sinai', 'The Land of Moriah', 'Mount Ararat', 'The Desert of Paran'],
    correctOptionIndex: 1,
    reference: 'Genesis 22:2',
    explanation: 'God said, "Take now your son... and go to the land of Moriah, and offer him there."'
  },
  {
    id: 49,
    type: 'multiple_choice',
    question: 'What did Abraham say when Isaac asked, "Where is the lamb for a burnt offering?"',
    options: [
      '"You are the sacrifice, my son."',
      '"God will provide for Himself the lamb for a burnt offering."',
      '"We will find one on the mountain."',
      '"Silence, son, and carry the wood."'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 22:8',
    explanation: 'Abraham answered, "My son, God will provide for Himself the lamb for a burnt offering."'
  },
  {
    id: 50,
    type: 'multiple_choice',
    question: 'What animal was caught in a thicket by its horns that Abraham sacrificed instead of Isaac?',
    options: ['A young bull', 'A heifer', 'A ram', 'A goat'],
    correctOptionIndex: 2,
    reference: 'Genesis 22:13',
    explanation: 'Abraham looked and saw behind him a ram caught in a thicket by its horns, and offered it up instead.'
  },

  // --- SARAH\'S DEATH, REBEKAH (Genesis 23-24) ---
  {
    id: 51,
    type: 'multiple_choice',
    question: 'Where did Abraham bury his wife Sarah, in a cave purchased from Ephron the Hittite?',
    options: ['The Cave of Machpelah', 'The Tomb of Rachel', 'The Valley of Shechem', 'The high place of Bethel'],
    correctOptionIndex: 0,
    reference: 'Genesis 23:9-19',
    explanation: 'Sarah was buried in the cave of the field of Machpelah, near Mamre (Hebron).'
  },
  {
    id: 52,
    type: 'multiple_choice',
    question: 'What test did Abraham\'s oldest servant design to identify the right wife for Isaac at the well?',
    options: [
      'She would offer him bread to eat',
      'She would offer to draw water for both him and his camels',
      'She would wear a specific color or veil',
      'She would drop her jar and ask for help'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 24:14',
    explanation: 'The servant prayed that the chosen girl would say, "Drink, and I will also draw water for your camels."'
  },
  {
    id: 53,
    type: 'character_trivia',
    question: 'Who was the father of Rebekah and Laban?',
    options: ['Bethuel', 'Nahor', 'Lot', 'Abimelech'],
    correctOptionIndex: 0,
    reference: 'Genesis 24:15-24',
    explanation: 'Rebekah was the daughter of Bethuel, son of Milcah, the wife of Abraham\'s brother Nahor.'
  },
  {
    id: 54,
    type: 'true_false',
    question: 'True or False: Rebekah refused to leave her family right away, delay her trip, or go with Abraham\'s servant.',
    options: ['True', 'False'],
    correctOptionIndex: 1,
    reference: 'Genesis 24:57-58',
    explanation: 'False. When asked, "Will you go with this man?" Rebekah answered immediately, "I will go."'
  },
  {
    id: 55,
    type: 'multiple_choice',
    question: 'What was Isaac doing in the field when he first saw Rebekah and the servant approaching?',
    options: ['Sowing seed', 'Shearing sheep', 'Meditating or praying in the evening', 'Digging a well'],
    correctOptionIndex: 2,
    reference: 'Genesis 24:63',
    explanation: 'And Isaac went out to meditate in the field in the evening; and he lifted his eyes and looked.'
  },

  // --- JACOB & ESAU (Genesis 25-27) ---
  {
    id: 56,
    type: 'multiple_choice',
    question: 'How did Esau look when he was born?',
    options: [
      'Very small and pale',
      'Red and hairy, like a hairy garment',
      'He had a dark birthmark on his arm',
      'He was holding onto his brother\'s foot'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 25:25',
    explanation: 'The first came out red, all over like a hairy garment; and they called his name Esau.'
  },
  {
    id: 57,
    type: 'character_trivia',
    question: 'What was Jacob doing during birth that inspired his name, which means "heel-catcher" or "supplanter"?',
    options: [
      'He was crying louder than Esau',
      'He was holding Esau\'s heel',
      'He was born smiling',
      'He was pushing Esau back'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 25:26',
    explanation: 'Afterward his brother came out, and his hand took hold of Esau\'s heel; so his name was called Jacob.'
  },
  {
    id: 58,
    type: 'multiple_choice',
    question: 'For what food did Esau sell his birthright to Jacob?',
    options: ['A plate of roasted lamb and wine', 'Red lentil stew and some bread', 'Fresh figs and wild honey', 'Barley cakes and milk'],
    correctOptionIndex: 1,
    reference: 'Genesis 25:29-34',
    explanation: 'Esau was starving from the field and sold his birthright for bread and stew of lentils.'
  },
  {
    id: 59,
    type: 'who_said_this',
    question: 'Who said to Jacob: "Go now to the flock and bring me from there two choice young goats, and I will make savory food from them for your father, such as he loves"?',
    options: ['Isaac', 'Esau', 'Rebekah', 'Laban'],
    correctOptionIndex: 2,
    reference: 'Genesis 27:9',
    explanation: 'Rebekah plotted to help her favorite son, Jacob, steal the blessing by preparing the meat Isaac loved.'
  },
  {
    id: 60,
    type: 'multiple_choice',
    question: 'How did Jacob disguise his smooth hands to feel like Esau\'s hairy hands to his blind father?',
    options: [
      'He wore gloves made of rough sackcloth',
      'He glued straw and bark to his skin',
      'He put the skins of young goats on his hands and neck',
      'He covered himself in thick mud'
    ],
    correctOptionIndex: 2,
    reference: 'Genesis 27:16',
    explanation: 'She put the skins of the kids of the goats on his hands and on the smooth part of his neck.'
  },
  {
    id: 61,
    type: 'who_said_this',
    question: 'Who said: "The voice is Jacob\'s voice, but the hands are the hands of Esau"?',
    options: ['Rebekah', 'Isaac', 'Laban', 'Esau'],
    correctOptionIndex: 1,
    reference: 'Genesis 27:22',
    explanation: 'Isaac was suspicious but was ultimately deceived by the goat skins Jacob wore.'
  },
  {
    id: 62,
    type: 'multiple_choice',
    question: 'Why did Rebekah tell Jacob to flee to her brother Laban in Haran?',
    options: [
      'To earn wealth as a merchant',
      'Because Esau was planning to kill Jacob once Isaac died',
      'Because there was a famine in Beersheba',
      'To build a new altar to God there'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 27:41-43',
    explanation: 'Esau hated Jacob because of the stolen blessing, so Rebekah urged Jacob to escape to Haran.'
  },

  // --- JACOB\'S LADDER & LABAN (Genesis 28-30) ---
  {
    id: 63,
    type: 'multiple_choice',
    question: 'In his dream at Bethel, what did Jacob see resting on the earth and reaching to heaven?',
    options: ['A mighty tower of white stone', 'A ladder (or stairway) with angels ascending and descending on it', 'A golden chariot pulling stars', 'A river flowing upward into a bright cloud'],
    correctOptionIndex: 1,
    reference: 'Genesis 28:12',
    explanation: 'He dreamed of a ladder set up on the earth, its top reaching to heaven, with the angels of God ascending and descending.'
  },
  {
    id: 64,
    type: 'multiple_choice',
    question: 'What city, formerly named Luz, did Jacob rename "Bethel" because of his vision?',
    options: ['Hebron', 'Shechem', 'Luz', 'Salem'],
    correctOptionIndex: 2,
    reference: 'Genesis 28:19',
    explanation: 'He called the name of that place Bethel; but the name of that city had been Luz previously.'
  },
  {
    id: 65,
    type: 'multiple_choice',
    question: 'How many years did Jacob agree to serve Laban to marry his younger daughter, Rachel?',
    options: ['3 years', '7 years', '10 years', '14 years'],
    correctOptionIndex: 1,
    reference: 'Genesis 29:18',
    explanation: 'Jacob loved Rachel; so he said, "I will serve you seven years for Rachel your younger daughter."'
  },
  {
    id: 66,
    type: 'multiple_choice',
    question: 'Whom did Laban sneak into Jacob\'s wedding tent instead of Rachel on the first night?',
    options: ['Bilhah', 'Zilpah', 'Leah', 'Dinah'],
    correctOptionIndex: 2,
    reference: 'Genesis 29:21-25',
    explanation: 'In the morning, behold, it was Leah! Laban explained it was not their custom to marry off the younger before the firstborn.'
  },
  {
    id: 67,
    type: 'multiple_choice',
    question: 'What physical description does the scripture give of Leah\'s eyes compared to Rachel\'s beautiful appearance?',
    options: ['Leah had blue eyes', 'Leah had weak or delicate eyes', 'Leah had fiery dark eyes', 'Leah had blind eyes'],
    correctOptionIndex: 1,
    reference: 'Genesis 29:17',
    explanation: 'Leah\'s eyes were delicate (weak/tender), but Rachel was beautiful in form and appearance.'
  },
  {
    id: 68,
    type: 'multiple_choice',
    question: 'Who were the four sons Leah bore to Jacob first, before any other wife had children?',
    options: [
      'Reuben, Simeon, Levi, and Judah',
      'Dan, Naphtali, Gad, and Asher',
      'Issachar, Zebulun, Joseph, and Benjamin',
      'Edom, Moab, Ammon, and Ishmael'
    ],
    correctOptionIndex: 0,
    reference: 'Genesis 29:32-35',
    explanation: 'Leah bore Reuben, Simeon, Levi, and Judah, thanking God for looking on her affliction.'
  },
  {
    id: 69,
    type: 'character_trivia',
    question: 'What were the names of Bilhah and Zilpah, who also bore children to Jacob?',
    options: [
      'Laban\'s sisters',
      'Maidservants given to Rachel and Leah',
      'Canaanite neighbor women',
      'Wives of Esau'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 29:24-29',
    explanation: 'Bilhah was Rachel\'s maidservant, and Zilpah was Leah\'s maidservant.'
  },
  {
    id: 70,
    type: 'multiple_choice',
    question: 'What plant (often associated with fertility) did Reuben find in the field that Rachel bargained with Leah to obtain?',
    options: ['Wild barley', 'Mandrakes', 'Myrrh', 'Frankincense'],
    correctOptionIndex: 1,
    reference: 'Genesis 30:14-15',
    explanation: 'Reuben found mandrakes in the field, and Rachel traded her turn with Jacob for them.'
  },

  // --- JACOB\'S EXPANSION & ESCAPE (Genesis 31-33) ---
  {
    id: 71,
    type: 'character_trivia',
    question: 'What did Rachel steal from her father Laban\'s house before they fled back to Canaan?',
    options: [
      'His bags of gold and silver coins',
      'His household idols (teraphim)',
      'His official lineage scrolls',
      'His ceremonial staff'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 31:19',
    explanation: 'Rachel had stolen the household idols that were her father’s.'
  },
  {
    id: 72,
    type: 'multiple_choice',
    question: 'Where did Jacob hide Rachel\'s stolen household idols when Laban searched their tents?',
    options: [
      'In a deep hole dug under her chest',
      'Inside her camel\'s saddle, and she sat on them',
      'In a jar of flour in her baking area',
      'Under Jacob\'s sleeping mat'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 31:34',
    explanation: 'Rachel put the idols in the camel’s saddle and sat on them, claiming she could not stand.'
  },
  {
    id: 73,
    type: 'character_trivia',
    question: 'With whom did Jacob wrestle all night until the breaking of day at Peniel?',
    options: ['A Canaanite robber', 'Esau\'s champion', 'A Man / Angel of God', 'Laban\'s son'],
    correctOptionIndex: 2,
    reference: 'Genesis 32:24-30',
    explanation: 'Jacob wrestled with a Man (revealed as God manifest/an angel) and said, "I have seen God face to face."'
  },
  {
    id: 74,
    type: 'multiple_choice',
    question: 'What new name did the wrestling messenger give to Jacob because he struggled with God and with men?',
    options: ['Abraham', 'Israel', 'Jeshurun', 'Isaac'],
    correctOptionIndex: 1,
    reference: 'Genesis 32:28',
    explanation: 'He said, "Your name shall no longer be called Jacob, but Israel; for you have struggled with God and with men."'
  },
  {
    id: 75,
    type: 'multiple_choice',
    question: 'What physical injury did the messenger inflict on Jacob to end the wrestling match?',
    options: ['He struck his arm out of joint', 'He touched the socket of his hip, putting it out of joint', 'He blinded his eye', 'He broke his ankle'],
    correctOptionIndex: 1,
    reference: 'Genesis 32:25',
    explanation: 'When the Man saw he did not prevail against Jacob, he touched the socket of his hip, rendering him with a limp.'
  },
  {
    id: 76,
    type: 'multiple_choice',
    question: 'How did Esau receive Jacob when they finally met face to face after many years?',
    options: [
      'He attacked Jacob\'s vanguard with 400 men',
      'He ran to meet him, embraced him, fell on his neck, and kissed him',
      'He refused to speak and rode away',
      'He demanded half of Jacob\'s cattle as fine'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 33:4',
    explanation: 'But Esau ran to meet him, and embraced him, and fell on his neck and kissed him, and they wept.'
  },

  // --- JOSEPH sold into Egypt (Genesis 37) ---
  {
    id: 77,
    type: 'multiple_choice',
    question: 'Why did Israel (Jacob) love Joseph more than all his other children?',
    options: [
      'Because Joseph was his firstborn',
      'Because Joseph was the son of his old age',
      'Because Joseph was a mighty hunter',
      'Because Joseph was very compliant'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 37:3',
    explanation: 'Now Israel loved Joseph more than all his children, because he was the son of his old age.'
  },
  {
    id: 78,
    type: 'multiple_choice',
    question: 'What famous gift did Jacob give to Joseph that sparked intense jealousy in his brothers?',
    options: ['A golden signet ring', 'A tunic of many colors (or a long-sleeved robe)', 'A beautiful white lamb', 'A silver pocket knife'],
    correctOptionIndex: 1,
    reference: 'Genesis 37:3',
    explanation: 'He made him a tunic of many colors (often translated as a long robe with sleeves).'
  },
  {
    id: 79,
    type: 'multiple_choice',
    question: 'In Joseph\'s first dream, what were his brothers\' sheaves of grain doing to his sheaf?',
    options: ['They withered away', 'They stood upright and bowed down to his sheaf', 'They caught fire', 'They grew taller than his sheaf'],
    correctOptionIndex: 1,
    reference: 'Genesis 37:7',
    explanation: 'Joseph dreamed: "My sheaf arose and stood upright; and your sheaves stood all around and bowed down to my sheaf."'
  },
  {
    id: 80,
    type: 'multiple_choice',
    question: 'In Joseph\'s second dream, what celestial bodies bowed down to him?',
    options: [
      'The sun, the moon, and eleven stars',
      'Twelve shooting stars',
      'The constellation Orion',
      'The sun and seven planets'
    ],
    correctOptionIndex: 0,
    reference: 'Genesis 37:9',
    explanation: '"This time, the sun, the moon, and the eleven stars bowed down to me."'
  },
  {
    id: 81,
    type: 'character_trivia',
    question: 'Which brother intervened to save Joseph\'s life when the others wanted to murder him in Dothan?',
    options: ['Judah', 'Levi', 'Reuben', 'Simeon'],
    correctOptionIndex: 2,
    reference: 'Genesis 37:21-22',
    explanation: 'Reuben heard it and said, "Let us not kill him... shed no blood, but cast him into this pit," planning to deliver him later.'
  },
  {
    id: 82,
    type: 'multiple_choice',
    question: 'To which group of passing merchants did the brothers sell Joseph into slavery?',
    options: ['Philistines', 'Ishmaelites/Midianites', 'Assyrians', 'Moabites'],
    correctOptionIndex: 1,
    reference: 'Genesis 37:25-28',
    explanation: 'They sold Joseph to Ishmaelite traders who were coming from Gilead with spices.'
  },
  {
    id: 83,
    type: 'multiple_choice',
    question: 'How did the brothers convince Jacob that Joseph had been killed by a wild beast?',
    options: [
      'They brought back his broken sandals',
      'They dipped Joseph\'s tunic in male goat\'s blood and brought it to Jacob',
      'They brought a simulated skeleton',
      'They hired a false witness to tell him'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 37:31-33',
    explanation: 'They killed a kid of the goats, and dipped the tunic in the blood and brought it to their father.'
  },

  // --- JOSEPH IN POTIPHAR\'S HOUSE & PRISON (Genesis 39-40) ---
  {
    id: 84,
    type: 'character_trivia',
    question: 'Who was Joseph\'s first master in Egypt, an officer of Pharaoh and captain of the guard?',
    options: ['Potipherah', 'Potiphar', 'Abimelech', 'Phicol'],
    correctOptionIndex: 1,
    reference: 'Genesis 39:1',
    explanation: 'Joseph was bought by Potiphar, an Egyptian officer of Pharaoh and captain of the guard.'
  },
  {
    id: 85,
    type: 'multiple_choice',
    question: 'Why was Joseph thrown into the royal prison by his master Potiphar?',
    options: [
      'He was caught stealing gold',
      'He was falsely accused by Potiphar\'s wife of attempted assault',
      'He tried to escape to Canaan',
      'He interpreted a bad dream for Potiphar'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 39:7-20',
    explanation: 'Potiphar\'s wife lied and accused Joseph of assault when he refused her advances and ran away.'
  },
  {
    id: 86,
    type: 'multiple_choice',
    question: 'Which two royal officers did Joseph interpret dreams for while in Pharaoh\'s prison?',
    options: [
      'The Captain of the Guard and the Viceroy',
      'The Chief Butler (Cupbearer) and the Chief Baker',
      'The royal scribe and the chief priest',
      'Two royal guards'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 40:1-4',
    explanation: 'The butler and baker of the king of Egypt had offended their lord and ended up in prison with Joseph.'
  },
  {
    id: 87,
    type: 'multiple_choice',
    question: 'In the Chief Butler\'s dream, how many branches did the vine have that budded and brought forth ripe grapes?',
    options: ['Three branches', 'Seven branches', 'Twelve branches', 'One branch'],
    correctOptionIndex: 0,
    reference: 'Genesis 40:9-10',
    explanation: 'The butler saw a vine before him, and on the vine were three branches which budded.'
  },
  {
    id: 88,
    type: 'multiple_choice',
    question: 'What was the meaning of the Chief Baker\'s dream of three baskets of bread on his head being eaten by birds?',
    options: [
      'He would be restored to his job in three days',
      'He would be executed (hanged) in three days and birds would eat his flesh',
      'He would travel to Syria in three months',
      'He would open a royal bakery'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 40:16-19',
    explanation: 'Joseph interpreted that within three days, Pharaoh would lift his head off him and hang him on a tree.'
  },

  // --- PHARAOH\'S DREAMS & RISE (Genesis 41) ---
  {
    id: 89,
    type: 'multiple_choice',
    question: 'In Pharaoh\'s first dream, what did the seven ugly, gaunt cows do to the seven sleek, fat cows?',
    options: [
      'They chased them out of Egypt',
      'They ate them up, yet remained gaunt',
      'They died beside them on the river bank',
      'They bowed down in worship to them'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 41:1-4',
    explanation: 'The gaunt and ugly cows ate up the seven fine and fat cows, but they still looked just as gaunt.'
  },
  {
    id: 90,
    type: 'multiple_choice',
    question: 'What did the seven thin, blighted heads of grain do to the seven plump, full heads in Pharaoh\'s second dream?',
    options: [
      'They withered away in the desert wind',
      'They swallowed up the seven plump heads',
      'They turned into gold',
      'They bore no fruit'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 41:5-7',
    explanation: 'The seven thin heads devoured the seven plump and full heads of grain.'
  },
  {
    id: 91,
    type: 'character_trivia',
    question: 'Who finally remembered Joseph and recommended him to Pharaoh when no wise man could interpret the dreams?',
    options: ['Potiphar', 'The Chief Butler (Cupbearer)', 'The Chief Baker\'s son', 'Joseph\'s brother Reuben'],
    correctOptionIndex: 1,
    reference: 'Genesis 41:9-13',
    explanation: 'The chief butler spoke to Pharaoh, confessing his mistake and remembering how Joseph interpreted his dream in prison.'
  },
  {
    id: 92,
    type: 'multiple_choice',
    question: 'What was the meaning of Pharaoh\'s dreams as interpreted by Joseph?',
    options: [
      'Seven years of great abundance followed by seven years of severe famine',
      'Seven nations would attack Egypt in seven years',
      'Egypt would conquer seven lands and lose seven rulers',
      'The Nile would flood seven times in forty days'
    ],
    correctOptionIndex: 0,
    reference: 'Genesis 41:25-30',
    explanation: 'The dream was doubled to show it was established by God: seven years of plenty followed by seven years of famine.'
  },
  {
    id: 93,
    type: 'multiple_choice',
    question: 'What was the Egyptian name Pharaoh gave to Joseph upon promoting him to second-in-command?',
    options: ['Potipherah', 'Zaphenath-Paneah', 'Asenath', 'Vizier Rameses'],
    correctOptionIndex: 1,
    reference: 'Genesis 41:45',
    explanation: 'Pharaoh called Joseph\'s name Zaphenath-Paneah, which means "Revealer of secrets" or "The one who gives life".'
  },
  {
    id: 94,
    type: 'character_trivia',
    question: 'Who was the daughter of the Priest of On that Pharaoh gave to Joseph as a wife?',
    options: ['Sarai', 'Asenath', 'Rebekah', 'Zilpah'],
    correctOptionIndex: 1,
    reference: 'Genesis 41:45',
    explanation: 'He gave him Asenath, the daughter of Poti-Pherah priest of On, to be his wife.'
  },

  // --- BROTHERS ARRIVE IN EGYPT, SILVER CUP (Genesis 42-44) ---
  {
    id: 95,
    type: 'multiple_choice',
    question: 'Which son did Jacob insist on keeping behind in Canaan when the other ten went to Egypt to buy food?',
    options: ['Reuben', 'Judah', 'Benjamin', 'Joseph'],
    correctOptionIndex: 2,
    reference: 'Genesis 42:4',
    explanation: 'Jacob did not send Benjamin, Joseph\'s brother, with his brothers, for he said, "Lest some calamity befall him."'
  },
  {
    id: 96,
    type: 'multiple_choice',
    question: 'What accusation did Joseph make against his brothers when they first came to buy grain, to test them?',
    options: [
      'That they were thieves who stole Egyptian silver',
      'That they were spies come to see the nakedness of the land',
      'That they had murdered Joseph',
      'That they brought false weights and measures'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 42:9',
    explanation: 'Joseph remembered his dreams and said, "You are spies; you have come to see the nakedness of the land."'
  },
  {
    id: 97,
    type: 'multiple_choice',
    question: 'Which brother was bound and kept in prison in Egypt as hostage while the others returned to fetch Benjamin?',
    options: ['Reuben', 'Simeon', 'Levi', 'Judah'],
    correctOptionIndex: 1,
    reference: 'Genesis 42:24',
    explanation: 'He took Simeon from them and bound him before their eyes as a guarantee of their return.'
  },
  {
    id: 98,
    type: 'multiple_choice',
    question: 'What surprise gift did the brothers find in their grain sacks when they stopped to feed their donkeys on the way home?',
    options: [
      'Egyptian scarabs',
      'Each man\'s bundle of silver money returned in his sack',
      'Fresh Egyptian fruits',
      'Joseph\'s signature coat'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 42:25-27',
    explanation: 'Joseph had commanded to restore every man\'s money to his sack, which frightened them greatly when they found it.'
  },
  {
    id: 99,
    type: 'multiple_choice',
    question: 'Where did Joseph secretly hide his special silver cup to test his brothers\' loyalty to Benjamin?',
    options: [
      'In Judah\'s saddle bag',
      'In the mouth of Benjamin\'s sack of grain',
      'Under Potiphar\'s chariot seat',
      'In the prison warden\'s vault'
    ],
    correctOptionIndex: 1,
    reference: 'Genesis 44:1-2',
    explanation: 'He commanded: "Put my cup, the silver cup, in the mouth of the sack of the youngest, and his grain money."'
  },
  {
    id: 100,
    type: 'character_trivia',
    question: 'Which brother made a passionate plea to Joseph, offering to take Benjamin\'s place as a lifelong slave in Egypt so Benjamin could return to Jacob?',
    options: ['Reuben', 'Simeon', 'Judah', 'Dan'],
    correctOptionIndex: 2,
    reference: 'Genesis 44:33',
    explanation: 'Judah pleaded, "Now therefore, please let your servant remain instead of the lad as a slave to my lord, and let the lad go up with his brothers."'
  }
];
