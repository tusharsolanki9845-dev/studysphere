// Verified chapter lists of the current NCERT textbooks (new NCF-SE books), compiled from public
// class-wise NCERT book listings checked in Nov 2026. Format:
//   ## class | subject name used in schoolCurriculum | textbook title
//   Chapter title [:: sub-topics separated by ;]
// Classes 10-12 still use the older NCERT books, which the main curriculum file already follows.
export const NCERT_RAW = `
## 6 | Mathematics | Ganita Prakash
Patterns in Mathematics
Lines and Angles
Number Play
Data Handling and Presentation
Prime Time
Perimeter and Area
Fractions
Playing with Constructions
Symmetry
The Other Side of Zero
## 6 | Science | Curiosity
The Wonderful World of Science
Diversity in the Living World
Mindful Eating: A Path to a Healthy Body
Exploring Magnets
Measurement of Length and Motion
Materials Around Us
Temperature and its Measurement
A Journey through States of Water
Methods of Separation in Everyday Life
Living Creatures: Exploring their Characteristics
Nature's Treasures
Beyond Earth
## 6 | English | Poorvi
Unit 1: Fables and Folk Tales :: A Bottle of Dew; The Raven and the Fox; Rama to the Rescue
Unit 2: Friendship :: The Unlikely Best Friends; A Friend's Prayer; The Chair
Unit 3: Nurturing Nature :: Neem Baba; What a Bird Thought; Spices that Heal Us
Unit 4: Sports and Wellness :: Change of Heart; The Winner; Yoga: A Way of Life
Unit 5: Culture and Tradition :: Hamara Bharat: Incredible India!; The Kites; Ila Sachani: Embroidering Dreams with her Feet; National War Memorial
## 6 | Social Science | Exploring Society: India and Beyond
Locating Places on the Earth
Oceans and Continents
Landforms and Life
Timeline and Sources of History
India, That Is Bharat
The Beginnings of Indian Civilisation
India's Cultural Roots
Unity in Diversity, or Many in the One
Family and Community
Grassroots Democracy, Part 1: Governance
Grassroots Democracy, Part 2: Local Government in Rural Areas
Grassroots Democracy, Part 3: Local Government in Urban Areas
The Value of Work
Economic Activities Around Us
## 7 | Mathematics | Ganita Prakash (Parts I and II)
Large Numbers Around Us
Arithmetic Expressions
A Peek Beyond the Point
Expressions using Letter-Numbers
Parallel and Intersecting Lines
Number Play
A Tale of Three Intersecting Lines
Working with Fractions
Geometric Twins
Operations with Integers
Finding Common Ground
Another Peek Beyond the Point
Connecting the Dots
Constructions and Tilings
Finding the Unknown
## 7 | Science | Curiosity
The Ever-Evolving World of Science
Exploring Substances: Acidic, Basic, and Neutral
Electricity: Circuits and Their Components
The World of Metals and Non-metals
Changes Around Us: Physical and Chemical
Adolescence: A Stage of Growth and Change
Heat Transfer in Nature
Measurement of Time and Motion
Life Processes in Animals
Life Processes in Plants
Light: Shadows and Reflections
Earth, Moon, and the Sun
## 7 | Social Science | Exploring Society: India and Beyond (Parts 1 and 2)
Geographical Diversity of India
Understanding the Weather
Climates of India
New Beginnings: Cities and States
The Rise of Empires
The Age of Reorganisation
The Gupta Era: An Age of Tireless Creativity
How the Land Becomes Sacred
From the Rulers to the Ruled: Types of Governments
The Constitution of India: An Introduction
From Barter to Money
Understanding Markets
The Story of Indian Farming
India and Her Neighbours
Empires and Kingdoms: 6th to 10th Centuries
Turning Tides: 11th and 12th Centuries
India, A Home to Many
The State, the Government, and You
Infrastructure: Engine of India's Development
Banks and the Magic of Finance
## 7 | English | Poorvi
Unit 1: Learning Together
Unit 2: Wit and Humour
Unit 3: Dreams and Discoveries
Unit 4: Travel and Adventure
Unit 5: Bravehearts
## 7 | Hindi | Malhar
Maa, Kah Ek Kahani (kavita)
Teen Buddhimaan (lokkatha)
Phool aur Kaanta (kavita)
Paani re Paani (nibandh)
Nahin Hona Beemar (kahani)
Giridhar Kavirai ki Kundaliyan (kavita)
Varsha-Bahar (kavita)
Birju Maharaj se Saakshatkaar
Chidiya (kavita)
Meera ke Pad
## 7 | Sanskrit | Deepakam
Vande Bharatmataram
Nityam Pibamah Subhashitarasam
Mitraya Namah
Na Labhyate Chet Amlam Draksha-phalam
Seva Hi Paramo Dharmah
Kridama Vayam Shlokantyaksharim
Ishavasyam Idam Sarvam
Hitam Manohari Cha Durlabham Vachah
Annad Bhavanti Bhutani
Dashamah Kah?
Dvipeshu Ramyah Dvipo Andamanah
Viranga Panna Dhaya
Varnamatra-Parichayah
Shabdarupani
Dhaturupani
## 8 | Mathematics | Ganita Prakash (Parts I and II)
A Square and A Cube
Power Play
A Story of Numbers
Quadrilaterals
Number Play
We Distribute, Yet Things Multiply
Proportional Reasoning-1
Fractions in Disguise
The Baudhayana-Pythagoras Theorem
Proportional Reasoning-2
Exploring Some Geometric Themes
Tales by Dots and Lines
Algebra Play
Area
## 8 | Science | Curiosity
Exploring the Investigative World of Science
The Invisible Living World: Beyond Our Naked Eye
Health: The Ultimate Treasure
Electricity: Magnetic and Heating Effects
Exploring Forces
Pressure, Winds, Storms, and Cyclones
Particulate Nature of Matter
Nature of Matter: Elements, Compounds, and Mixtures
The Amazing World of Solutes, Solvents, and Solutions
Light: Mirrors and Lenses
Keeping Time with the Skies
How Nature Works in Harmony
Our Home: Earth, a Unique Life Sustaining Planet
## 8 | Social Science | Exploring Society: India and Beyond (Part 1 listed; check Part 2 with your school)
Natural Resources and Their Use
Reshaping India's Political Map
The Rise of the Marathas
The Colonial Era in India
Universal Franchise and India's Electoral System
The Parliamentary System: Legislature and Executive
Factors of Production
## 8 | English | Poorvi
Unit 1: Wit and Wisdom
Unit 2: Values and Dispositions
Unit 3: Mystery and Magic
Unit 4: Environment
Unit 5: Science and Curiosity
## 8 | Hindi | Malhar
Swadesh (kavita)
Do Gauraiya (kahani)
Ek Aashirvad (kavita)
Haridwar (patra)
Kabir ke Dohe
Ek Tokri Bhar Mitti (kahani)
Mat Bandho (kavita)
Naye Mehmaan (ekanki)
Aadmi ka Anupaat (kavita)
Tarun ke Swapn (udbodhan)
## 8 | Sanskrit | Deepakam
Sangachchhadhvam Samvadadhvam
Alpanamapi Vastunam Samhatih Karyasadhika
Subhashitarasam Pitva Jivanam Saphalam Kuru
Pranamyo Deshabhakto'yam Gopabandhur Mahamanah
Gita Sugita Kartavya
Digibharatam: Yugaparivartanam
Manjulamanjusha Sundarasurabhasha
Pashyata Konamaishanyam Bharatasya Manoharam
Ko'ruk? Ko'ruk? Ko'ruk?
Sannimitte Varam Tyagah (Part A)
Sannimitte Varam Tyagah (Part B)
Samyagvarnaprayogena Brahmaloke Mahiyate
Varnochcharana-Shiksha 1
`;
