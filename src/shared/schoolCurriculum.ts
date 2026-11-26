import { NCERT_RAW } from './ncertBooks';

export type Stream = 'PCM' | 'PCB' | 'COM' | 'HUM';

export interface SchoolChapter {
  title: string;
  concepts: string[];
}

export interface SchoolSubject {
  key: string; // e.g. "10|Mathematics"
  classNum: number;
  name: string;
  streams: Stream[] | 'all';
  chapters: SchoolChapter[];
  /** Show only for these boards (ids from schoolBoards). */
  onlyBoards?: string[];
  /** Hide for these boards (a board-specific replacement exists). */
  notBoards?: string[];
  /** Regional / second-language subject. */
  language?: boolean;
  /** Current NCERT textbook for this class and subject, when known. */
  book?: string;
  /** True when the chapter titles were checked against the current textbook. */
  verified?: boolean;
}

export const STREAM_LABELS: Record<Stream, string> = {
  PCM: 'Science (PCM)',
  PCB: 'Science (PCB)',
  COM: 'Commerce',
  HUM: 'Humanities / Arts',
};

export const CLASS_BANDS = [
  { label: 'Primary', classes: [3, 4, 5] },
  { label: 'Middle', classes: [6, 7, 8] },
  { label: 'Secondary', classes: [9, 10] },
  { label: 'Senior Secondary', classes: [11, 12] },
];

// Format: "## class | subject | streams" then "Chapter title :: concept; concept; concept".
// Chapter lists are topic areas that follow the NCERT-style national framework. Boards may reorder, merge or add chapters.
const RAW = `
## 3 | English | all
Reading short stories and poems :: sight words; reading aloud; picture clues; answering who/what/where
Phonics and spelling :: vowel and consonant sounds; blends; common spelling patterns
Naming words and doing words :: nouns (common, proper); singular and plural; simple verbs
Describing words and position words :: adjectives; prepositions; opposites
Making sentences :: capital letters; full stops; question marks; jumbled sentences
Writing :: five-line paragraphs; picture description; simple notes
## 3 | Hindi | all
Varnamala and matras :: swar and vyanjan; matras; barahkhadi; reading simple words
Shabd rachna :: two- and three-letter words; picture-word matching; rhyming words
Kahaniyan aur kavitayen :: reading short stories; poems with actions; answering questions
Vyakaran ki shuruat :: sangya; ling; vachan; opposites
Lekhan :: simple sentences; picture description; short letters
## 3 | Mathematics | all
Numbers up to 1000 :: place value; reading and writing numbers; comparing; ordering
Addition and subtraction :: carrying and borrowing; word problems; estimation
Multiplication :: tables up to 10; repeated addition; word problems
Division :: sharing and grouping; relation with multiplication
Fractions :: half, one-third, one-fourth; parts of a whole
Measurement :: length, weight, capacity using standard units
Time and money :: reading clocks; calendar; rupees and paise; simple bills
Shapes, patterns and symmetry :: 2D and 3D shapes; patterns; line of symmetry
Data handling :: tally marks; pictographs; reading simple tables
## 3 | Environmental Studies | all
My body and senses :: parts of the body; five senses; keeping clean
Plants and animals around us :: parts of a plant; habitats; food habits of animals
Food and water :: sources of food; healthy eating; uses and saving of water
Family, home and neighbourhood :: kinds of families; houses; community helpers
Travel and communication :: modes of transport; letters, phone, newspapers
Safety and our environment :: road safety; waste; keeping surroundings clean
## 3 | Computer Science | all
Meet the computer :: parts of a computer; uses of computers at home and school
Input and output devices :: keyboard; mouse; monitor; printer
Working with the desktop :: icons; windows; opening and closing programs
Drawing with Paint :: shapes, colours, fill and save a drawing
Using computers safely :: posture; screen time; good habits
## 4 | English | all
Reading stories and poems :: main idea; characters; sequence of events; new words
Vocabulary building :: synonyms and antonyms; homophones; compound words
Nouns, pronouns and articles :: collective nouns; personal pronouns; a, an, the
Verbs and tenses :: past, present, future; helping verbs; subject-verb agreement
Adjectives, adverbs and prepositions :: degrees of comparison; adverbs of manner; place and time words
Sentences and punctuation :: kinds of sentences; commas; quotation marks
Writing skills :: paragraphs; informal letters; stories from cues
## 4 | Hindi | all
Gadya aur padya path :: reading with meaning; poems; question-answer
Vyakaran :: sangya; sarvanaam; visheshan; kriya; kaal
Shabd bhandar :: paryayvachi; vilom; anekarthi shabd
Patra aur anuched lekhan :: informal letter; short paragraphs
Muhavare aur lokokti :: common idioms and sayings
## 4 | Mathematics | all
Numbers up to 10,000 :: place value; expanded form; rounding; comparing
Addition and subtraction :: larger numbers; estimation; word problems
Multiplication and division :: two- and three-digit multiplication; long division basics
Factors and multiples :: tables; common multiples; divisibility rules
Fractions and decimals :: equivalent fractions; adding like fractions; tenths and hundredths
Geometry :: lines, rays, angles; types of angles; shapes and symmetry
Perimeter and area :: perimeter of rectangles and squares; counting squares for area
Money, time and calendar :: bills; 24-hour clock; duration; reading calendars
Data handling :: bar graphs; tally charts; interpreting data
## 4 | Environmental Studies | all
Plants and animals :: food chains; adaptation; life cycles of common animals
The human body and health :: teeth; bones and muscles; balanced diet; first aid
Water and weather :: water cycle; rain; seasons; saving water
Food and agriculture :: crops; farming tools; food preservation
Our country and its people :: states and languages; festivals; national symbols
Shelter, travel and communication :: houses over time; transport; media
## 4 | Computer Science | all
Computer basics :: hardware and software; memory; storage devices
Operating system and files :: folders; saving and finding files; shortcuts
Word processing basics :: typing; formatting text; inserting pictures
Introduction to the internet :: browsers; search; safe behaviour online
Coding with blocks :: sequences; loops; simple Scratch animations
## 5 | English | all
Reading comprehension :: inference; character and theme; poetry appreciation
Vocabulary :: prefixes and suffixes; idioms; word families
Grammar: parts of speech :: noun types; pronouns; adjectives; adverbs; conjunctions
Grammar: verbs and tenses :: simple, continuous and perfect tenses; active and passive (intro); modals
Sentence skills :: clauses; direct and indirect speech (intro); punctuation
Writing :: formal and informal letters; notices; diary entries; story writing
## 5 | Hindi | all
Gadya aur kavita :: comprehension; recitation; extracting meaning
Vyakaran :: sandhi basics; samas basics; kaal; vachya; visheshan
Shabd gyan :: paryayvachi; vilom; muhavare; anek shabdon ke liye ek shabd
Rachnatmak lekhan :: patra; anuched; kahani lekhan; samvad
## 5 | Mathematics | all
Large numbers :: Indian and international systems; place value up to lakhs; comparison
Operations on whole numbers :: four operations; estimation; order of operations (intro)
Factors, multiples, HCF and LCM :: prime and composite numbers; common factors; simple LCM
Fractions :: like and unlike fractions; mixed numbers; addition and subtraction
Decimals :: place value; operations; money and measures in decimals
Geometry and symmetry :: angles; triangles and quadrilaterals; reflection symmetry; nets of solids
Measurement :: units of length, weight, capacity; perimeter, area and volume (intro)
Time, speed and money :: time intervals; simple speed; profit and loss (intro)
Data handling :: bar graphs; line graphs; average (mean)
## 5 | Environmental Studies | all
Our body and food :: digestion basics; nutrients; balanced diet; food safety
Water, air and weather :: water cycle; air pollution; climate and seasons
Plants, animals and biodiversity :: forests; conservation; endangered species
Natural resources and energy :: renewable and non-renewable resources; saving energy
Our country :: maps; states and capitals; people and cultures; unity in diversity
Safety and community :: disaster safety; first aid; rights and responsibilities
## 5 | Computer Science | all
Computer systems :: CPU; memory; input, output and storage
Word processing :: formatting; tables; page setup; printing
Spreadsheet basics :: cells, rows, columns; simple formulas; charts
Internet and email :: browsing; email; netiquette; online safety
Programming concepts :: algorithms; flowcharts; events and loops in Scratch
## 6 | English | all
Reading prose and poetry :: theme; tone; character; figures of speech
Grammar :: tenses; subject-verb agreement; articles; determiners; prepositions
Sentence structure :: kinds of sentences; clauses; transformation of sentences
Vocabulary :: word formation; synonyms and antonyms; one-word substitutes
Writing skills :: formal and informal letters; paragraphs; notices; story and diary writing
## 6 | Hindi | all
Gadya and padya sankalan :: comprehension; poetry appreciation; summary
Vyakaran :: sandhi; samas; upsarg and pratyay; kaal; vachya
Shabd sampada :: paryayvachi; vilom; muhavare; anek ke liye ek shabd
Rachnatmak lekhan :: patra; nibandh; anuched; sanvad
## 6 | Mathematics | all
Knowing our numbers :: large numbers; Indian and international systems; estimation; Roman numerals
Whole numbers :: number line; properties of operations; patterns
Playing with numbers :: factors and multiples; prime numbers; divisibility; HCF and LCM
Basic geometrical ideas and shapes :: points, lines, angles, polygons, circles; types of triangles and quadrilaterals
Integers :: negative numbers; number line; addition and subtraction of integers
Fractions and decimals :: comparing; operations; decimal place value; conversions
Data handling :: pictographs; bar graphs; collecting and organising data
Mensuration :: perimeter and area of rectangles and squares
Introduction to algebra :: variables; expressions; simple equations
Ratio and proportion :: ratio; unitary method; proportion
Symmetry and practical geometry :: line symmetry; constructions with ruler and compass
## 6 | Science | all
Food: where does it come from :: plant and animal sources; food components; balanced diet
Fibre to fabric :: natural fibres; spinning, weaving; cotton and jute
Sorting materials :: properties of materials; transparency; solubility
Separation of substances :: filtration; evaporation; sedimentation; winnowing
Changes around us :: reversible and irreversible changes
Getting to know plants :: root, stem, leaf, flower; photosynthesis basics
Body movements :: joints; skeleton; movement in animals
Living organisms and surroundings :: habitat; adaptation; characteristics of living things
Motion and measurement :: types of motion; standard units; measuring length
Light, shadows and reflections :: luminous objects; shadows; mirrors; pinhole camera
Electricity and circuits :: cell, bulb, switch; conductors and insulators
Fun with magnets :: magnetic materials; poles; compass
Water and air :: sources and uses; water cycle; composition of air
Garbage in, garbage out :: waste segregation; composting; recycling
## 6 | Social Science | all
History: earliest societies :: hunter-gatherers; early farming; first cities
History: early kingdoms and empires :: Mahajanapadas; Mauryas; trade; rise of new ideas
Geography: the Earth :: solar system; globe; latitudes and longitudes; motions of the Earth
Geography: landforms and India :: mountains, plateaus, plains; major physical features of India
Civics: diversity and government :: unity in diversity; democracy; local government
Economic life :: livelihoods in rural and urban areas
## 6 | Sanskrit | all
Varnamala and shabdroop :: akshar and varna; common nouns in the singular, dual and plural; ukaranta and akaranta words
Dhatuvroop :: present-tense verbs; simple sentences
Sandhi and vocabulary :: easy sandhi; numbers; common words; subhashit
Anuvad and rachna :: translation of simple sentences; picture description
## 6 | Computer Science | all
Computer fundamentals :: hardware, software; memory and storage; operating systems
Word processing :: formatting; tables; images; mail merge basics
Presentation basics :: slides; animations; design principles
Block coding :: Scratch; sequences; loops; conditions; simple games
Digital citizenship :: cyber safety; netiquette; copyright
## 7 | English | all
Reading prose and poetry :: theme; setting; narrative voice; imagery
Grammar :: tenses; modals; active and passive; reported speech; conjunctions
Sentence work :: clauses; sentence transformation; editing and omission
Vocabulary :: root words; idioms and phrases; commonly confused words
Writing :: letters; notices; articles; diary and story writing; messages
## 7 | Hindi | all
Gadya aur padya path :: comprehension; poem appreciation; summary
Vyakaran :: sandhi; samas; ras aur alankar (intro); vachya; muhavare
Shabd gyan :: paryayvachi; vilom; anek ke liye ek shabd; shabd shuddhi
Lekhan :: patra; nibandh; anuched; sanvad; suchana
## 7 | Mathematics | all
Integers :: operations on integers; properties; word problems
Fractions and decimals :: multiplication and division; converting; real-life problems
Data handling :: mean, median, mode; bar graphs; probability (intro)
Simple equations :: forming and solving linear equations
Lines and angles :: complementary and supplementary angles; parallel lines and transversals
The triangle and its properties :: angle-sum property; exterior angle; Pythagoras theorem
Congruence of triangles :: SSS, SAS, ASA, RHS criteria
Comparing quantities :: percentage; profit and loss; simple interest
Rational numbers :: positive and negative rationals; operations; number line
Practical geometry :: constructing triangles and parallel lines
Perimeter and area :: area of parallelogram and triangle; circles; circumference
Algebraic expressions :: terms and coefficients; adding and subtracting; evaluating
Exponents and powers :: laws of exponents; standard form
Symmetry and solid shapes :: lines and rotational symmetry; nets and views of 3D shapes
## 7 | Science | all
Nutrition in plants and animals :: photosynthesis; digestion in humans and ruminants
Fibre to fabric :: wool and silk; processing
Heat :: temperature; conduction, convection, radiation; clinical thermometer
Acids, bases and salts :: indicators; neutralisation; everyday examples
Physical and chemical changes :: rusting; crystallisation; chemical reactions
Weather, climate and adaptations :: elements of weather; polar and tropical animals
Winds, storms and cyclones :: air pressure; thunderstorms; safety
Soil :: soil profile; types; erosion and conservation
Respiration in organisms :: breathing; aerobic and anaerobic respiration
Transportation in animals and plants :: blood, heart; xylem and phloem; excretion
Reproduction in plants :: asexual and sexual; pollination; seed dispersal
Motion and time :: speed; distance-time graphs
Electric current and its effects :: heating and magnetic effects; electromagnet; symbols and circuits
Light :: reflection; mirrors; lenses; dispersion
Water and forests :: water table; conservation; forest ecosystem
Wastewater story :: sewage treatment; sanitation
## 7 | Social Science | all
History: medieval India :: Delhi Sultanate; Mughals; regional kingdoms; devotional movements
History: society and culture :: towns, traders, craftspeople; architecture; tribes
Geography: environment and its components :: lithosphere, hydrosphere, atmosphere, biosphere
Geography: landscapes and regions :: interior of the Earth; rocks; air, water; natural regions
Civics: democracy and equality :: government; gender and equality; state government
Economic life :: markets; media and advertising
## 7 | Sanskrit | all
Shabdroop :: nouns and pronouns in all cases; adjectives
Dhatuvroop :: lat, lan, lrt tenses; common verbs
Sandhi and samas basics :: swar sandhi; simple compounds
Anuvad and rachna :: translation; letter; picture description
Subhashit and stories :: moral verses; short prose
## 7 | Computer Science | all
Spreadsheets :: formulas; functions; charts; sorting and filtering
Introduction to HTML :: tags; text, links, images; first web page
Python or block-based coding :: variables; input/output; conditions; loops
Networks and the internet :: LAN, WAN; how the internet works; email
Cyber safety :: strong passwords; phishing; privacy
## 8 | English | all
Reading prose, poetry and drama :: theme; characterisation; mood; literary devices
Grammar :: tenses; modals; clauses; voice; speech; question tags
Sentence work :: editing, omission and error spotting; sentence reordering
Vocabulary :: idioms; phrasal verbs; word formation
Writing :: formal letters; notices; articles; reports; speeches
## 8 | Hindi | all
Gadya aur padya path :: comprehension; poem appreciation; extended reading
Vyakaran :: sandhi; samas; alankar; vachya; kaarak; muhavare
Shabd gyan :: paryayvachi; vilom; shabd shuddhi; tatsam and tadbhav
Lekhan :: patra; nibandh; vigyapan; samvad; anuched
## 8 | Mathematics | all
Rational numbers :: properties; operations; representation on number line
Linear equations in one variable :: solving; word problems; equations with variables on both sides
Understanding quadrilaterals :: angle-sum property; types of quadrilaterals; properties of parallelogram
Practical geometry :: constructing quadrilaterals with given data
Data handling :: grouping data; histograms; pie charts; probability
Squares and square roots :: perfect squares; finding roots; patterns
Cubes and cube roots :: perfect cubes; estimating roots
Comparing quantities :: discount; tax; compound interest; growth and depreciation
Algebraic expressions and identities :: multiplying polynomials; standard identities
Mensuration :: area of trapezium and polygons; surface area and volume of cube, cuboid, cylinder
Exponents and powers :: negative exponents; laws; scientific notation
Direct and inverse proportion :: variation; word problems
Factorisation :: common factors; regrouping; identities; division of polynomials
Introduction to graphs :: reading line graphs; plotting points; linear graphs
## 8 | Science | all
Crop production and management :: agricultural practices; irrigation; storage; manures and fertilisers
Microorganisms: friend and foe :: bacteria, viruses, fungi; uses; diseases; food preservation
Synthetic fibres and plastics :: types; properties; environmental effects
Metals and non-metals :: physical and chemical properties; reactivity; uses
Coal and petroleum :: fossil fuels; refining; natural gas
Combustion and flame :: types of combustion; flame structure; fuel efficiency
Conservation of plants and animals :: biodiversity; protected areas; reforestation
Cell: structure and functions :: cell organelles; plant versus animal cells; unicellular and multicellular
Reproduction in animals :: sexual and asexual; fertilisation; metamorphosis
Reaching the age of adolescence :: puberty; hormones; reproductive health
Force and pressure :: types of force; pressure in liquids and gases; atmospheric pressure
Friction :: types; advantages and disadvantages; reducing and increasing friction
Sound :: production; frequency and pitch; noise pollution; human ear
Chemical effects of electric current :: conduction in liquids; electroplating
Some natural phenomena :: lightning; earthquakes; safety
Light :: laws of reflection; kaleidoscope; human eye; Braille
Stars and the solar system :: constellations; planets; satellites
Pollution of air and water :: causes; effects; greenhouse effect; prevention
## 8 | Social Science | all
History: modern India :: colonial rule; 1857 revolt; reforms; national movement
History: economy and society under colonial rule :: land revenue; weavers; tribal societies
Geography: resources and development :: natural and human resources; agriculture; industries
Geography: human resources :: population distribution; land, soil, water, mineral and power resources
Civics: the Indian Constitution :: fundamental rights and duties; parliament; judiciary; law and justice
Economic life :: public facilities; markets
## 8 | Sanskrit | all
Shabdroop and sarvanaam :: nouns and pronouns in all cases and numbers
Dhatuvroop :: lat, lrt, lang, lot, vidhilin tenses
Sandhi, samas, pratyay :: common types with examples
Anuvad and rachna :: translation; letter; essay
## 8 | Computer Science | all
Advanced spreadsheet and database ideas :: functions; charts; tables; queries (intro)
Python programming basics :: variables; data types; input/output; if-else; loops
Web design with HTML and CSS :: tags; lists; tables; basic styling
Artificial intelligence and data :: what is AI; data and patterns; everyday uses
Cyber ethics and safety :: digital footprint; copyright; cyberbullying; privacy
## 9 | English (Language and Literature) | all
Reading comprehension :: factual, discursive and literary passages; inference; vocabulary in context
Writing skills :: formal and informal letters; analytical paragraph; article; story; diary entry
Grammar :: tenses; modals; subject-verb agreement; reported speech; determiners; gap filling
Prose :: themes, characters and messages in prescribed stories and essays
Poetry :: poetic devices; imagery; tone; summary and appreciation
Drama and supplementary reader :: plot; character; dialogue; long reading text
## 9 | Hindi | all
Apathit gadyansh and padyansh :: comprehension; inference; vocabulary
Vyakaran :: ras; alankar; samas; sandhi; muhavare; vakya bhed; shabd bhed
Rachnatmak lekhan :: anuched; patra; vigyapan; sanvad; suchana
Sahitya (prose) :: themes and authors in prescribed lessons
Sahitya (poetry) :: poets; poetic beauty; bhaav and kala paksh
## 9 | Mathematics | all
Number systems :: rational and irrational numbers; real numbers on the number line; laws of exponents
Polynomials :: zeroes; remainder theorem; factor theorem; algebraic identities
Coordinate geometry :: Cartesian plane; plotting points
Linear equations in two variables :: solutions; graphs
Introduction to Euclid's geometry :: axioms and postulates
Lines and angles :: pairs of angles; parallel lines; angle-sum property
Triangles :: congruence criteria; properties of triangles; inequalities
Quadrilaterals :: parallelogram properties; mid-point theorem
Circles :: chords; angles subtended; cyclic quadrilaterals
Heron's formula :: area of triangles; applications to quadrilaterals
Surface areas and volumes :: cuboid, cylinder, cone, sphere, hemisphere
Statistics :: data presentation; histograms; frequency polygons; mean, median, mode
## 9 | Science | all | not:cisce
Matter in our surroundings :: states of matter; change of state; evaporation; latent heat
Is matter around us pure? :: mixtures; solutions; colloids; separation techniques; physical and chemical changes
Atoms and molecules :: laws of chemical combination; mole concept; atomic and molecular mass
Structure of the atom :: Thomson, Rutherford and Bohr models; electronic configuration; isotopes and isobars
The fundamental unit of life :: cell theory; organelles; prokaryotes and eukaryotes; diffusion and osmosis
Tissues :: plant tissues; animal tissues; functions
Motion :: distance and displacement; speed, velocity, acceleration; equations of motion; graphs
Force and laws of motion :: Newton's three laws; momentum; conservation of momentum
Gravitation :: universal law; free fall; weight; buoyancy; Archimedes' principle
Work and energy :: work; kinetic and potential energy; power; conservation of energy
Sound :: wave nature; frequency, amplitude; echo; human ear; ultrasound
Improvement in food resources :: crop and animal husbandry; manure; organic farming
## 9 | Social Science | all | not:cisce
History: the French Revolution :: causes; the Revolution and its ideals; impact
History: socialism in Europe and the Russian Revolution :: February and October revolutions; Lenin
History: Nazism and the rise of Hitler :: Weimar Republic; Nazi ideology; the Holocaust
History: forest society and colonialism; pastoralists :: forest laws; tribal revolts; nomadic communities
Geography: India size, location, physical features and drainage :: Himalayas; plains; plateau; river systems
Geography: climate, vegetation, wildlife and population :: monsoon; natural vegetation; biodiversity; population characteristics
Political science: democracy and constitutional design :: what is democracy; making of the Indian Constitution
Political science: electoral politics, institutions and rights :: elections; Parliament; judiciary; fundamental rights
Economics: village economy and people as a resource :: Palampur; factors of production; education and health
Economics: poverty and food security :: poverty line; anti-poverty programmes; PDS
## 9 | Information Technology / Artificial Intelligence (skill subject) | all | not:cisce
Communication skills :: verbal and non-verbal communication; barriers
Self-management and ICT skills :: stress management; digital documentation; spreadsheets
Entrepreneurial and green skills :: ideas; business planning; sustainability
Introduction to AI :: AI, ML and data; applications; AI project cycle (intro)
Data literacy and ethics :: types of data; graphs; bias; responsible use
## 10 | English (Language and Literature) | all
Reading comprehension :: unseen passages; inference; vocabulary
Writing skills :: formal letters; analytical paragraph; article; story; speech
Grammar :: tenses; modals; clauses; determiners; reported speech; editing and omission
Prose :: themes and messages in prescribed lessons
Poetry :: poetic devices; imagery; summary and central idea
Drama and supplementary reader :: character sketches; plot; value-based questions
## 10 | Hindi | all
Apathit gadyansh and padyansh :: comprehension; inference
Vyakaran :: ras; alankar; samas; vachya; padbandh; muhavare
Rachnatmak lekhan :: anuched; patra; vigyapan; suchana; sanvad
Sahitya (prose) :: themes, authors and messages
Sahitya (poetry) :: poets; bhaav and kala paksh
## 10 | Mathematics | all
Real numbers :: Euclid's division lemma; fundamental theorem of arithmetic; irrational numbers; decimal expansions
Polynomials :: zeroes; relationship between zeroes and coefficients; graphs
Pair of linear equations in two variables :: graphical, substitution, elimination methods; word problems
Quadratic equations :: factorisation; quadratic formula; nature of roots; word problems
Arithmetic progressions :: nth term; sum of n terms; applications
Triangles :: similarity criteria; basic proportionality theorem; areas of similar triangles; Pythagoras theorem
Coordinate geometry :: distance formula; section formula; area of triangle
Introduction to trigonometry :: ratios; standard angles; identities
Some applications of trigonometry :: heights and distances
Circles :: tangent to a circle; lengths of tangents
Areas related to circles :: sectors; segments; combinations of figures
Surface areas and volumes :: combinations and conversion of solids
Statistics :: mean, median and mode of grouped data; ogives
Probability :: classical definition; simple problems
## 10 | Science | all | not:cisce
Chemical reactions and equations :: balancing; types of reactions; oxidation and reduction; corrosion; rancidity
Acids, bases and salts :: indicators; pH; neutralisation; common salts and uses
Metals and non-metals :: reactivity series; ionic compounds; extraction; corrosion
Carbon and its compounds :: covalent bonding; homologous series; nomenclature; ethanol and ethanoic acid; soaps
Life processes :: nutrition; respiration; transportation; excretion
Control and coordination :: nervous system; reflex action; hormones in animals and plants
How do organisms reproduce? :: asexual and sexual reproduction; human reproductive system
Heredity :: Mendel's laws; sex determination; inherited traits
Light: reflection and refraction :: mirrors; lenses; mirror formula; refractive index
The human eye and the colourful world :: defects of vision; dispersion; scattering
Electricity :: Ohm's law; resistance; series and parallel; heating effect; power
Magnetic effects of electric current :: field lines; solenoid; electric motor; electromagnetic induction; generator
Our environment :: ecosystem; food chains; ozone depletion; waste management
## 10 | Social Science | all | not:cisce
History: nationalism in Europe, Indo-China and India :: unification movements; resistance to colonial rule; Non-Cooperation; Civil Disobedience
History: making of a global world, industrialisation, cities :: trade and migration; early factories; urban life; print culture
Geography: resources, agriculture and minerals :: resource planning; land use; farming; mining and energy
Geography: manufacturing industries and lifelines :: industrial location; roads, railways, ports; trade
Geography: water resources, forests and wildlife :: dams; conservation; sustainable use
Political science: power sharing and federalism :: Belgium and Sri Lanka; levels of government; decentralisation
Political science: democracy, parties and outcomes :: gender, religion and caste; political parties; accountability
Economics: development and sectors of the economy :: income and other goals; primary, secondary, tertiary; employment
Economics: money, credit, globalisation, consumer rights :: formal and informal credit; MNCs; trade; consumer movement
## 10 | Information Technology / Artificial Intelligence (skill subject) | all | not:cisce
Communication and self-management skills :: effective communication; goal setting
ICT skills :: word processing; spreadsheets; presentations; digital documentation
Entrepreneurial and green skills :: business ideas; marketing; sustainable development
AI project cycle and machine learning :: problem scoping; data acquisition; modelling; evaluation
Ethics, bias and responsible AI :: privacy; fairness; societal impact
## 11 | Physics | PCM,PCB
Units and measurements :: SI units; dimensions; errors; significant figures
Motion in a straight line :: displacement, velocity, acceleration; kinematic equations; graphs
Motion in a plane :: vectors; projectile motion; relative velocity; uniform circular motion
Laws of motion :: Newton's laws; friction; circular motion dynamics; conservation of momentum
Work, energy and power :: work-energy theorem; potential energy; collisions
System of particles and rotational motion :: centre of mass; torque; moment of inertia; angular momentum
Gravitation :: Kepler's laws; gravitational potential; escape speed; satellites
Mechanical properties of solids and fluids :: stress-strain; Bernoulli's principle; viscosity; surface tension
Thermal properties and thermodynamics :: calorimetry; laws of thermodynamics; heat engines
Kinetic theory of gases :: pressure; degrees of freedom; specific heats
Oscillations and waves :: simple harmonic motion; resonance; wave speed; superposition; beats
## 11 | Chemistry | PCM,PCB
Some basic concepts of chemistry :: mole concept; stoichiometry; limiting reagent
Structure of atom :: quantum numbers; orbitals; electronic configuration; Bohr model
Classification of elements and periodicity :: periodic trends; ionisation enthalpy; electronegativity
Chemical bonding and molecular structure :: VSEPR; hybridisation; molecular orbital theory
Thermodynamics :: enthalpy; Hess's law; entropy; Gibbs energy
Equilibrium :: Le Chatelier's principle; ionic equilibrium; pH; buffers
Redox reactions :: oxidation numbers; balancing; applications
Organic chemistry: basic principles :: nomenclature; isomerism; reaction mechanisms; electronic effects
Hydrocarbons :: alkanes, alkenes, alkynes; aromatic compounds; reactions
## 11 | Mathematics | PCM,COM
Sets :: types; Venn diagrams; operations
Relations and functions :: Cartesian product; domain and range; types of functions
Trigonometric functions :: radian measure; identities; graphs; equations
Complex numbers and quadratic equations :: Argand plane; polar form; roots
Linear inequalities :: solving; graphical solution
Permutations and combinations :: fundamental principle of counting; nPr and nCr
Binomial theorem :: expansion; general term
Sequences and series :: AP; GP; special series
Straight lines :: slope; forms of equations; distance of a point from a line
Conic sections :: circle; parabola; ellipse; hyperbola
Introduction to three-dimensional geometry :: coordinates; distance; section formula
Limits and derivatives :: limits of functions; derivative from first principles
Statistics and probability :: measures of dispersion; random experiments; events
## 11 | Biology | PCB
The living world and biological classification :: taxonomy; five kingdoms; viruses
Plant and animal kingdoms :: classification of plants; classification of animals
Morphology and anatomy of flowering plants :: root, stem, leaf, flower, fruit; tissue systems
Structural organisation in animals :: tissues; cockroach and frog (study)
Cell: the unit of life; biomolecules :: cell organelles; proteins, carbohydrates, lipids; enzymes
Cell cycle and cell division :: mitosis; meiosis
Photosynthesis and respiration in plants :: light reactions; Calvin cycle; glycolysis; Krebs cycle
Plant growth and development :: growth regulators; photoperiodism
Breathing and body fluids :: respiratory system; circulation; blood groups
Excretion, movement and coordination :: kidney; muscle; neural and chemical coordination
## 11 | English (Core) | all
Reading comprehension :: unseen passages; note making; summarising
Writing skills :: notices; formal letters; posters; speech; debate; article
Grammar :: determiners; tenses; modals; clauses; reported speech; editing and omission
Prose :: themes and critical appreciation of prescribed lessons
Poetry :: devices; imagery; tone; central idea
Supplementary reader :: character sketches; theme-based and long-answer questions
## 11 | Computer Science | PCM,COM
Computer systems and organisation :: hardware; software; number systems; Boolean logic
Computational thinking and programming (Python) :: variables; data types; operators; conditionals; loops
Strings, lists, tuples and dictionaries :: operations; methods; common programs
Society, law and ethics :: digital footprint; IT Act; intellectual property; e-waste
## 11 | Accountancy | COM
Introduction to accounting :: meaning; objectives; branches; users; basic terms
Theory base of accounting :: GAAP; accounting concepts; Ind AS and IFRS overview; accounting equation
Recording of transactions :: journal; ledger; cash book; subsidiary books
Bank reconciliation statement :: reasons for differences; preparation
Trial balance and rectification of errors :: types of errors; suspense account
Depreciation, provisions and reserves :: straight-line and written-down value methods
Financial statements :: trading and profit and loss account; balance sheet
Accounts from incomplete records and computers in accounting :: single entry; accounting software
## 11 | Business Studies | COM
Business, trade and commerce :: nature and objectives of business; business risks
Forms of business organisation :: sole proprietorship; partnership; company; cooperatives
Public, private and global enterprises :: public sector; MNCs
Business services and emerging modes :: banking; insurance; e-business; outsourcing
Social responsibility and business ethics :: environmental protection
Sources of business finance :: owner funds; borrowed funds
Small business and startups :: MSMEs; entrepreneurship
Internal and international trade :: wholesale; retail; foreign trade procedures
## 11 | Economics | COM,HUM
Indian economy on the eve of independence :: colonial economy; occupational structure
Indian economy 1950-1990 :: planning; agriculture; industry; trade policy
Economic reforms since 1991 :: liberalisation; privatisation; globalisation
Poverty, human capital and rural development :: measurement; education and health; credit; markets
Employment and sustainable development :: workforce; informal sector; environment
Statistics: data collection and presentation :: sampling; tables; diagrams
Statistics: measures and relations :: mean, median, mode; correlation; index numbers
## 11 | History | HUM
From the beginning of time :: early humans; Stone Age
Early societies and empires :: Mesopotamia; Rome; Han empires
Changing traditions :: Islamic lands; nomadic empires; Renaissance
Paths to modernisation :: industrial revolution; native Americans; Japan and China
## 11 | Political Science | HUM
Constitution: why and how :: making of the Constitution; philosophy
Rights, citizenship and elections :: fundamental rights; election system
Executive, legislature, judiciary :: structure; powers; relationships
Federalism and local government :: division of powers; panchayats
Political theory: freedom, equality, justice :: liberty; equality; social justice; rights
Citizenship, nationalism, secularism, peace and development :: key ideas and debates
## 11 | Geography | HUM
Geography as a discipline and the Earth :: branches; origin and evolution of the Earth; interior
Landforms and geomorphic processes :: rocks; weathering; erosion; landforms
Climate and atmosphere :: structure of atmosphere; pressure; winds; world climates
Oceans and life on the Earth :: ocean water; tides; biodiversity
India: physical environment :: structure; drainage; climate; vegetation; soils; hazards
## 11 | Psychology | HUM
What is psychology? and methods of enquiry :: goals; branches; research methods
Human development :: stages; influences; adolescence
Sensation, attention and perception :: senses; perceptual organisation; illusions
Learning, memory and thinking :: conditioning; memory processes; problem solving
Motivation and emotion :: theories; types of emotions
## 11 | Sociology | HUM
Introducing sociology :: sociological imagination; scope; relation to other disciplines
Understanding social institutions :: family; kinship; economy; polity; religion; education
Culture and socialisation :: norms; values; agencies of socialisation
Doing sociology: research methods :: survey; observation; interview
Social structure, stratification and social processes :: caste; class; cooperation; conflict
## 11 | Hindi (Core) | all
Apathit bodh :: comprehension; inference; vocabulary
Rachnatmak lekhan :: patra; nibandh; report; sanvad; vigyapan
Vyakaran :: shabd aur pad; ras; alankar; muhavare
Sahitya: gadya :: major prose pieces and authors
Sahitya: padya :: poets; bhaav paksh and kala paksh
## 12 | Physics | PCM,PCB
Electric charges and fields :: Coulomb's law; electric field; Gauss's law
Electrostatic potential and capacitance :: potential; dipoles; capacitors; dielectrics
Current electricity :: Ohm's law; Kirchhoff's rules; Wheatstone bridge; potentiometer
Moving charges and magnetism :: Biot-Savart law; Ampere's law; force on moving charge
Magnetism and matter :: bar magnet; Earth's magnetism; para-, dia- and ferromagnetic materials
Electromagnetic induction and alternating current :: Faraday's and Lenz's laws; LCR circuits; transformers
Electromagnetic waves :: displacement current; electromagnetic spectrum
Ray optics and optical instruments :: reflection; refraction; lenses; prisms; microscopes and telescopes
Wave optics :: interference; diffraction; polarisation
Dual nature of radiation and matter :: photoelectric effect; de Broglie hypothesis
Atoms and nuclei :: Bohr model; spectra; binding energy; radioactivity
Semiconductor electronics :: p-n junction; diodes; logic gates
## 12 | Chemistry | PCM,PCB
Solutions :: concentration terms; Raoult's law; colligative properties
Electrochemistry :: galvanic cells; Nernst equation; electrolysis; conductance
Chemical kinetics :: rate laws; order; Arrhenius equation
d- and f-block elements :: properties; lanthanoids; actinoids
Coordination compounds :: Werner's theory; nomenclature; bonding and isomerism
Haloalkanes and haloarenes :: SN1 and SN2; named reactions
Alcohols, phenols and ethers :: preparation; properties; reactions
Aldehydes, ketones and carboxylic acids :: nucleophilic addition; named reactions
Amines :: classification; preparation; diazonium salts
Biomolecules :: carbohydrates; proteins; vitamins; nucleic acids
## 12 | Mathematics | PCM,COM
Relations and functions :: equivalence relations; one-one and onto functions
Inverse trigonometric functions :: domain and range; properties
Matrices and determinants :: operations; inverse; solving linear equations
Continuity and differentiability :: chain rule; implicit and parametric differentiation
Applications of derivatives :: rate of change; maxima and minima; increasing and decreasing functions
Integrals :: indefinite and definite integrals; methods of integration
Applications of integrals :: area under curves
Differential equations :: order and degree; variable separable; linear equations
Vector algebra :: dot and cross product; applications
Three-dimensional geometry :: direction cosines; lines and planes
Linear programming :: formulation; graphical method
Probability :: conditional probability; Bayes' theorem; random variables
## 12 | Biology | PCB
Reproduction in organisms :: sexual reproduction in flowering plants; human reproduction; reproductive health
Genetics and evolution :: Mendelian inheritance; molecular basis of inheritance; evolution
Biology in human welfare :: human health and disease; microbes in human welfare
Biotechnology :: principles and processes; applications
Ecology and environment :: organisms and populations; ecosystem; biodiversity and conservation
## 12 | English (Core) | all
Reading comprehension :: unseen passages; note making; summarising
Writing skills :: notices; invitations; letters; articles; reports; speeches
Grammar :: reordering; editing; gap filling; reported speech
Prose :: themes and critical appreciation of prescribed lessons
Poetry :: devices; imagery; tone; central idea
Supplementary reader :: character sketches; theme-based and long-answer questions
## 12 | Computer Science | PCM,COM
Python revision, functions and exception handling :: functions; scope; try and except
File handling and data structures :: text, binary and CSV files; stack
Computer networks :: topologies; protocols; network devices; web basics
Database management and SQL :: relational model; keys; SQL queries; aggregate functions
Python-MySQL connectivity :: connectors; executing queries from Python
## 12 | Accountancy | COM
Accounting for not-for-profit organisations :: receipts and payments; income and expenditure; balance sheet
Partnership: fundamentals and goodwill :: partnership deed; profit-sharing; goodwill valuation
Partnership: admission, retirement, death and dissolution :: revaluation; new ratios; settlement
Accounting for share capital and debentures :: issue; forfeiture; reissue; redemption
Analysis of financial statements :: comparative and common-size statements; accounting ratios; cash flow statement
## 12 | Business Studies | COM
Nature and significance of management :: functions; levels; coordination
Principles of management and business environment :: Fayol; Taylor; business environment
Planning, organising, staffing :: types of plans; structure; recruitment; training
Directing and controlling :: motivation; leadership; communication; control process
Financial management and financial markets :: capital structure; working capital; stock exchange; SEBI
Marketing management and consumer protection :: marketing mix; Consumer Protection Act
## 12 | Economics | COM,HUM
Introductory macroeconomics: national income :: circular flow; GDP; measurement methods
Money and banking :: functions of money; commercial banks; central bank
Income and employment determination :: aggregate demand and supply; multiplier
Government budget and the open economy :: budget components; deficits; exchange rates; balance of payments
Introductory microeconomics: consumer and producer behaviour :: utility; demand; production; costs
Market forms and price determination :: perfect competition; supply and demand analysis
## 12 | History | HUM
Themes in Indian History I :: Harappan civilisation; early states; kinship, caste and class; philosophy and architecture
Themes in Indian History II :: travellers' accounts; bhakti and Sufi traditions; Vijayanagara; Mughal courts
Themes in Indian History III :: colonialism and the countryside; the Revolt of 1857; Mahatma Gandhi; Partition; framing of the Constitution
## 12 | Political Science | HUM
Contemporary world politics :: Cold War; US hegemony; international organisations; security; globalisation
Politics in India since Independence :: nation-building; planning; party systems; popular movements; regional aspirations
## 12 | Geography | HUM
Fundamentals of human geography :: population; human development; resources and economic activities; transport; trade; settlements
India: people and economy :: population; resources; agriculture; industries; planning; sustainable development; transport; trade
## 12 | Psychology | HUM
Variations in psychological attributes :: intelligence; aptitude; creativity
Self and personality :: theories; assessment
Meeting life challenges :: stress; coping; health
Psychological disorders and therapies :: types; causes; therapeutic approaches
Social psychology :: attitudes; social influence; group processes
## 12 | Sociology | HUM
Indian society :: demographic structure; social institutions; market as a social institution
Social inequality and exclusion :: caste; tribe; gender; disability
Social change and development in India :: development; globalisation; social movements
Environment and society :: ecological issues; sociological thinkers
## 12 | Hindi (Core) | all
Apathit bodh :: comprehension; inference; vocabulary
Rachnatmak lekhan :: patra; nibandh; report; sanvad; vigyapan
Vyakaran :: shabd aur pad; ras; alankar; muhavare
Sahitya: gadya :: major prose pieces and authors
Sahitya: padya :: poets; bhaav paksh and kala paksh
## 9 | Physics | all | only:cisce
Measurements and experimentation :: units; vernier callipers and screw gauge; errors
Motion in one dimension :: speed, velocity, acceleration; equations of motion; graphs
Laws of motion :: Newton's laws; momentum; gravitation
Fluids :: pressure; buoyancy; Archimedes' principle; floatation
Heat and energy :: work, energy and power; heat and temperature; specific heat
Light :: reflection; refraction; lenses; spectrum
Sound :: wave properties; echo; speed of sound
## 9 | Chemistry | all | only:cisce
The language of chemistry :: symbols; formulae; equations; balancing
Chemical changes and reactions :: types of reactions; rate of change
Water :: properties; solubility; hard and soft water
Atomic structure and chemical bonding :: atom; ions; ionic and covalent bonding
The periodic table :: periodic properties; trends
Study of the first element: hydrogen :: preparation; properties; uses
Study of gas laws and atmosphere :: Boyle's and Charles' laws; composition of air
## 9 | Biology | all | only:cisce
Introducing biology and cell biology :: branches of biology; cell structure and functions
Tissues :: plant and animal tissues
Flowering plants :: morphology; root, stem and leaf modifications
Plant physiology :: transpiration; photosynthesis (intro)
Diversity in living organisms :: classification; kingdoms
Human anatomy and physiology :: digestion; respiration; circulation; skeleton
Health, hygiene and economic biology :: diseases; first aid; useful organisms
## 9 | History and Civics | all | only:cisce
Early India :: Harappan civilisation; Vedic age; Mahajanapadas; Mauryas; Guptas
Medieval India :: Delhi Sultanate; Mughal Empire; Bhakti and Sufi movements
Civics: the Constitution and citizenship :: Preamble; fundamental rights and duties; local self-government
## 9 | Geography | all | only:cisce
The Earth as a planet :: shape; latitudes and longitudes; rotation and revolution
Structure of the Earth :: rocks; weathering; earthquakes and volcanoes
Hydrosphere and atmosphere :: ocean water; weather and climate
Map study :: topographical maps; map scale and symbols
## 9 | Computer Applications | all | only:cisce
Object-oriented programming concepts :: objects; classes; encapsulation; inheritance
Elementary concept of Java :: tokens; data types; variables; operators
Input and output; library functions :: Scanner; Math methods
Conditional and iterative statements :: if-else; switch; loops
## 10 | Physics | all | only:cisce
Force, work, power and energy :: moment of force; work-energy; machines
Light :: refraction; lenses; spectrum; total internal reflection
Sound :: vibrations; resonance; wave properties
Electricity and magnetism :: current electricity; household circuits; electromagnetism
Heat and modern physics :: calorimetry; radioactivity; nuclear energy
## 10 | Chemistry | all | only:cisce
Periodic properties and chemical bonding :: trends; electrovalent, covalent and coordinate bonds
Acids, bases and salts; analytical chemistry :: pH; tests for ions
Mole concept and stoichiometry :: Avogadro's law; gas volumes
Electrolysis and metallurgy :: electrolytes; extraction of metals
Study of compounds :: hydrogen chloride; ammonia; nitric acid; sulphuric acid
Organic chemistry :: hydrocarbons; alcohols; carboxylic acids
## 10 | Biology | all | only:cisce
Cell cycle and genetics :: mitosis; meiosis; Mendel's laws; chromosomes
Plant physiology :: absorption; transpiration; photosynthesis; plant hormones
Human body systems :: circulatory; excretory; nervous; endocrine; sense organs
Reproduction and population :: reproductive system; birth control; population
Human evolution and pollution :: evolution; environmental pollution
## 10 | History and Civics | all | only:cisce
Growth of nationalism in India :: 1857; Indian National Congress; partition of Bengal; Gandhian era
Independence and the world :: Partition; world wars; United Nations; Non-Aligned Movement
Civics: Indian government :: Union Legislature; Union Executive; Judiciary
## 10 | Geography | all | only:cisce
India: location and physical features :: map study; climate; soils; natural vegetation
India: resources and economy :: water; minerals; energy; agriculture; industries
Transport and waste management :: modes of transport; waste and conservation
## 10 | Computer Applications | all | only:cisce
Revision of class 9 Java :: classes; data types; operators
Class as the basis of all computation :: constructors; user-defined methods; encapsulation
Library classes and arrays :: wrapper classes; arrays; searching and sorting
String handling :: String methods; character and string programs
`;

function parse(): SchoolSubject[] {
  const out: SchoolSubject[] = [];
  let cur: SchoolSubject | null = null;
  for (const line of RAW.split('\n')) {
    const l = line.trim();
    if (!l) continue;
    if (l.startsWith('## ')) {
      const [cls, name, streams, filter] = l.slice(3).split('|').map((x) => x.trim());
      cur = {
        key: `${cls}|${name}`,
        classNum: Number(cls),
        name,
        streams: streams === 'all' ? 'all' : (streams.split(',').map((s) => s.trim()) as Stream[]),
        chapters: [],
        onlyBoards: filter?.startsWith('only:') ? filter.slice(5).split(',') : undefined,
        notBoards: filter?.startsWith('not:') ? filter.slice(4).split(',') : undefined,
      };
      out.push(cur);
    } else if (cur) {
      const [title, rest] = l.split('::').map((x) => x.trim());
      cur.chapters.push({ title, concepts: (rest ?? '').split(';').map((c) => c.trim()).filter(Boolean) });
    }
  }
  return out;
}

// ---- Regional and second languages: skills framework by stage (texts are set by each board) ----
const LANGUAGES = ['Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Odia', 'Punjabi', 'Assamese', 'Urdu'];

export const BOARD_LANGUAGES: Record<string, string[]> = {
  maharashtra: ['Marathi'], goa: ['Marathi'], gujarat: ['Gujarati'], wb: ['Bengali'], tn: ['Tamil'], ap: ['Telugu'],
  telangana: ['Telugu', 'Urdu'], karnataka: ['Kannada'], kerala: ['Malayalam'], odisha: ['Odia'], punjab: ['Punjabi'],
  assam: ['Assamese', 'Bengali'], jk: ['Urdu'], madrasa: ['Urdu', 'Bengali'], tripura: ['Bengali'],
};

function languageChapters(classNum: number): SchoolChapter[] {
  if (classNum <= 5)
    return [
      { title: 'Script, sounds and alphabet', concepts: ['letters and matras or equivalents', 'reading simple words', 'dictation'] },
      { title: 'Vocabulary from daily life', concepts: ['family, food, animals, nature', 'picture-word matching', 'opposites'] },
      { title: 'Simple sentences and reading', concepts: ['short stories and poems', 'answering questions', 'rhymes'] },
      { title: 'Basic writing', concepts: ['copy and free writing', 'five-line paragraph', 'simple letter (Class 5)'] },
    ];
  if (classNum <= 8)
    return [
      { title: 'Prose and poetry in the prescribed reader', concepts: ['theme and summary', 'new words and meanings', 'recitation'] },
      { title: 'Grammar', concepts: ['nouns, pronouns, adjectives', 'verbs and tenses', 'case and gender', 'sandhi and compounds (where applicable)'] },
      { title: 'Vocabulary and idioms', concepts: ['synonyms and antonyms', 'proverbs and idioms', 'one-word substitutes'] },
      { title: 'Comprehension and composition', concepts: ['unseen passage', 'informal and formal letters', 'short essays'] },
    ];
  if (classNum <= 10)
    return [
      { title: 'Prescribed prose', concepts: ['theme and message', 'character and style', 'long and short answers'] },
      { title: 'Prescribed poetry', concepts: ['poetic devices', 'central idea', 'appreciation'] },
      { title: 'Grammar and usage', concepts: ['tenses and voice', 'clauses and sentence types', 'error correction'] },
      { title: 'Unseen comprehension', concepts: ['inference', 'vocabulary in context'] },
      { title: 'Composition and translation', concepts: ['letters and notices', 'essay and report', 'translation from and into English'] },
    ];
  return [
    { title: 'Literature: prose and drama', concepts: ['prescribed texts', 'themes and characters', 'critical appreciation'] },
    { title: 'Literature: poetry', concepts: ['poets and movements', 'devices and imagery', 'explanation with reference to context'] },
    { title: 'Grammar and composition', concepts: ['advanced grammar', 'essay, report, article', 'formal letters'] },
    { title: 'Unseen passages and translation', concepts: ['comprehension', 'precis writing', 'translation'] },
    { title: 'Literary history', concepts: ['major authors and periods', 'regional literary traditions'] },
  ];
}

const LANGUAGE_SUBJECTS: SchoolSubject[] = LANGUAGES.flatMap((lang) =>
  Array.from({ length: 10 }, (_, i) => i + 3).map<SchoolSubject>((c) => ({
    key: `${c}|${lang}`,
    classNum: c,
    name: `${lang} (language)`,
    streams: 'all',
    chapters: languageChapters(c),
    language: true,
  }))
);

const CORE = parse();

// 1) Chapter titles checked against the current (new) NCERT textbooks.
for (const line of NCERT_RAW.split('\n')) {
  const l = line.trim();
  if (!l) continue;
  if (l.startsWith('## ')) {
    const [cls, name, book] = l.slice(3).split('|').map((x) => x.trim());
    var target = CORE.find((c) => c.classNum === Number(cls) && c.name === name);
    if (target) {
      target.chapters = [];
      target.book = book;
      target.verified = true;
    }
  } else if (target) {
    const [title, rest] = l.split('::').map((x) => x.trim());
    target.chapters.push({ title, concepts: (rest ?? '').split(';').map((c) => c.trim()).filter(Boolean) });
  }
}

// 2) Books known by name where chapter titles are not itemised yet. These keep topic areas.
const KNOWN_BOOKS: Record<string, string> = {
  '3|English': 'Santoor', '3|Hindi': 'Veena', '3|Mathematics': 'Maths Mela', '3|Environmental Studies': 'Our Wondrous World',
  '6|Hindi': 'Malhar (13 chapters)', '6|Sanskrit': 'Deepakam (16 chapters)',
  '9|English (Language and Literature)': 'Kaveri (7 chapters)', '9|Hindi': 'Ganga (12 chapters)',
  '9|Mathematics': 'Ganita Manjari (14 chapters, Parts 1 and 2)', '9|Science': 'Exploration (13 chapters)',
  '9|Social Science': 'Understanding Society: India and Beyond (15 chapters, Parts 1 and 2)',
};
for (const c of CORE) if (!c.verified && KNOWN_BOOKS[c.key]) c.book = KNOWN_BOOKS[c.key];

export const SCHOOL_SUBJECTS: SchoolSubject[] = [...CORE, ...LANGUAGE_SUBJECTS];

export function subjectsFor(classNum: number, stream?: Stream, boardId?: string): SchoolSubject[] {
  const langs = boardId && BOARD_LANGUAGES[boardId] ? BOARD_LANGUAGES[boardId] : LANGUAGES;
  return SCHOOL_SUBJECTS.filter((s) => {
    if (s.classNum !== classNum) return false;
    if (classNum >= 11 && s.streams !== 'all' && stream && !s.streams.includes(stream)) return false;
    if (boardId && s.onlyBoards && !s.onlyBoards.includes(boardId)) return false;
    if (boardId && s.notBoards?.includes(boardId)) return false;
    if (s.language && !langs.some((l) => s.name.startsWith(l))) return false;
    return true;
  });
}

export interface SchoolSearchHit {
  classNum: number;
  subject: string;
  chapter?: string;
}

export function searchSchool(query: string, limit = 12): SchoolSearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SchoolSearchHit[] = [];
  for (const s of SCHOOL_SUBJECTS) {
    if (s.language) continue; // 110 near-identical entries would swamp results
    if (s.name.toLowerCase().includes(q) || `class ${s.classNum}`.includes(q)) {
      hits.push({ classNum: s.classNum, subject: s.name });
    }
    for (const c of s.chapters) {
      if (c.title.toLowerCase().includes(q) || c.concepts.some((k) => k.toLowerCase().includes(q))) {
        hits.push({ classNum: s.classNum, subject: s.name, chapter: c.title });
      }
    }
    if (hits.length >= limit * 3) break;
  }
  const seen = new Set<string>();
  return hits.filter((h) => {
    const k = `${h.classNum}|${h.subject}|${h.chapter ?? ''}`;
    return seen.has(k) ? false : (seen.add(k), true);
  }).slice(0, limit);
}

const ks_ = (c: SchoolChapter) => (c.concepts.length ? c.concepts : [c.title]);

export function revisionSheet(subject: SchoolSubject, boardShort: string, done: number[]): string {
  const lines = [
    `# Class ${subject.classNum} ${subject.name} — Revision Sheet`,
    '',
    `> Board selected: ${boardShort}. Chapter list follows the national NCERT-style framework; confirm order and deletions with your board's latest syllabus.`,
    '',
  ];
  subject.chapters.forEach((c, i) => {
    lines.push(`## ${i + 1}. ${c.title}${done.includes(i) ? ' (done)' : ''}`);
    ks_(c).forEach((k) => lines.push(`- [ ] ${k}`));
    const ks = c.concepts.length ? c.concepts : [c.title];
    const [a, b, d] = ks;
    if (a) {
      lines.push('', '**Practice prompts**');
      lines.push(`1. Recall: define or state "${a}" in two lines.`);
      if (b) lines.push(`2. Apply: give one worked example, diagram or numerical on "${b}".`);
      lines.push(`${b ? 3 : 2}. Explain: why does "${d ?? a}" matter? Teach it aloud in 60 seconds.`);
    }
    lines.push('');
  });
  return lines.join('\n');
}
