import type {
  Branch,
  Course,
  PyqPaper,
  StudyNote,
  Subject,
  University,
} from './types';

export const WIDE_UNIVERSITIES: University[] = [
  {
    id: 'uni-du',
    slug: 'national-ug',
    name: 'University of Delhi & National NEP UG Framework',
    shortName: 'DU / NEP',
    type: 'central-university',
    state: 'Delhi',
    city: 'New Delhi',
    status: 'active',
    description:
      'Active NEP-2020 undergraduate honours and management framework covering B.Sc (Hons.), B.Com (Hons.), and BBA with credit-based syllabi, original study guides, and 70-mark practice exam blueprints.',
    officialDomain: 'du.ac.in',
  },
  {
    id: 'board-bteup',
    slug: 'bteup',
    name: 'Board of Technical Education Uttar Pradesh & State Polytechnics',
    shortName: 'BTEUP',
    type: 'education-board',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    status: 'active',
    description:
      'Active three-year Diploma in Engineering (Polytechnic) curriculum tracks across Computer Science and Mechanical Engineering with practical syllabus units, original notes, and exam blueprints.',
    officialDomain: 'bteup.ac.in',
  },
];

export const WIDE_COURSES: Course[] = [
  {
    id: 'course-bca',
    slug: 'bca',
    universityId: 'uni-aktu',
    name: 'Bachelor of Computer Applications',
    shortName: 'BCA',
    degreeLevel: 'Undergraduate',
    durationYears: 3,
    totalSemesters: 6,
    description:
      'Three-year undergraduate computing degree covering C/Java programming, data structures, relational databases, web development, networking, and applied software engineering.',
  },
  {
    id: 'course-mca',
    slug: 'mca',
    universityId: 'uni-aktu',
    name: 'Master of Computer Applications',
    shortName: 'MCA',
    degreeLevel: 'Postgraduate',
    durationYears: 2,
    totalSemesters: 4,
    description:
      'Two-year postgraduate computer applications programme focused on advanced algorithms, distributed architecture, artificial intelligence, cloud computing, and enterprise software systems.',
  },
  {
    id: 'course-mba',
    slug: 'mba',
    universityId: 'uni-aktu',
    name: 'Master of Business Administration',
    shortName: 'MBA',
    degreeLevel: 'Postgraduate',
    durationYears: 2,
    totalSemesters: 4,
    description:
      'Two-year postgraduate management programme covering organisational behaviour, managerial economics, corporate finance, strategic marketing, operations, and business analytics.',
  },
  {
    id: 'course-bpharm',
    slug: 'bpharm',
    universityId: 'uni-aktu',
    name: 'Bachelor of Pharmacy (PCI Syllabus)',
    shortName: 'B.Pharm',
    degreeLevel: 'Undergraduate',
    durationYears: 4,
    totalSemesters: 8,
    description:
      'Four-year Pharmacy Council of India (PCI) regulated degree covering human anatomy & physiology, pharmaceutics, medicinal chemistry, pharmacology, and clinical pharmacy.',
  },
  {
    id: 'course-bba',
    slug: 'bba',
    universityId: 'uni-du',
    name: 'Bachelor of Business Administration',
    shortName: 'BBA',
    degreeLevel: 'Undergraduate',
    durationYears: 3,
    totalSemesters: 6,
    description:
      'Three-year undergraduate management foundation covering principles of management, financial accounting, business law, digital marketing, and operations management.',
  },
  {
    id: 'course-bsc',
    slug: 'bsc-hons',
    universityId: 'uni-du',
    name: 'Bachelor of Science (Hons.)',
    shortName: 'B.Sc (Hons.)',
    degreeLevel: 'Undergraduate',
    durationYears: 3,
    totalSemesters: 6,
    description:
      'Three-year honours science programme with core tracks in Computer Science, Mathematics, and Physics aligned with NEP credit structures.',
  },
  {
    id: 'course-bcom',
    slug: 'bcom-hons',
    universityId: 'uni-du',
    name: 'Bachelor of Commerce (Hons.)',
    shortName: 'B.Com (Hons.)',
    degreeLevel: 'Undergraduate',
    durationYears: 3,
    totalSemesters: 6,
    description:
      'Three-year honours commerce programme covering financial accounting (Ind-AS), corporate law, income tax law, auditing, and corporate financial management.',
  },
  {
    id: 'course-diploma',
    slug: 'diploma-engineering',
    universityId: 'board-bteup',
    name: 'Diploma in Engineering (Polytechnic)',
    shortName: 'Diploma Engg.',
    degreeLevel: 'Diploma',
    durationYears: 3,
    totalSemesters: 6,
    description:
      'Three-year practice-oriented engineering diploma spanning applied mathematics, C programming, data structures, thermal engineering, and workshop fundamentals.',
  },
];

export const WIDE_BRANCHES: Branch[] = [
  {
    id: 'br-bca-core',
    slug: 'bca-core',
    courseId: 'course-bca',
    code: 'BCA-CORE',
    name: 'Software & Web Applications',
    description: 'Core programming in C & Java, SQL databases, web engineering, and operating systems.',
  },
  {
    id: 'br-bca-ds',
    slug: 'bca-ds',
    courseId: 'course-bca',
    code: 'BCA-DS',
    name: 'Data Science & Cloud Track',
    description: 'Database warehousing, Python analytics, and cloud application deployment.',
  },
  {
    id: 'br-mca-se',
    slug: 'mca-se',
    courseId: 'course-mca',
    code: 'MCA-SE',
    name: 'Software Systems & Architecture',
    description: 'Design & analysis of algorithms, enterprise backend design, and distributed systems.',
  },
  {
    id: 'br-mca-ai',
    slug: 'mca-ai',
    courseId: 'course-mca',
    code: 'MCA-AI',
    name: 'Artificial Intelligence & Analytics',
    description: 'Search algorithms, machine learning models, neural architectures, and data mining.',
  },
  {
    id: 'br-mba-fin',
    slug: 'mba-fin',
    courseId: 'course-mba',
    code: 'MBA-FIN',
    name: 'Finance & Operations',
    description: 'Corporate finance, capital budgeting, managerial economics, and supply chain systems.',
  },
  {
    id: 'br-mba-mkt',
    slug: 'mba-mkt',
    courseId: 'course-mba',
    code: 'MBA-MKT',
    name: 'Marketing & HR Management',
    description: 'Organisational behaviour, consumer strategy, brand positioning, and digital channels.',
  },
  {
    id: 'br-bpharm-core',
    slug: 'bpharm-core',
    courseId: 'course-bpharm',
    code: 'BPHARM',
    name: 'Pharmaceutical Sciences (PCI)',
    description: 'Anatomy, dosage forms, organic medicinal chemistry, and clinical pharmacology.',
  },
  {
    id: 'br-bba-gen',
    slug: 'bba-gen',
    courseId: 'course-bba',
    code: 'BBA-GEN',
    name: 'General Management & Marketing',
    description: 'Management principles, business law, digital marketing, and operations.',
  },
  {
    id: 'br-bba-fin',
    slug: 'bba-fin',
    courseId: 'course-bba',
    code: 'BBA-FIN',
    name: 'Business Accounting & Finance',
    description: 'Financial accounting, working capital analysis, and corporate governance.',
  },
  {
    id: 'br-bsc-cs',
    slug: 'bsc-cs',
    courseId: 'course-bsc',
    code: 'BSC-CS',
    name: 'Computer Science (Hons.)',
    description: 'Python programming, algorithms, operating systems, and computer networks.',
  },
  {
    id: 'br-bsc-math',
    slug: 'bsc-math',
    courseId: 'course-bsc',
    code: 'BSC-MATH',
    name: 'Mathematics & Physical Sciences',
    description: 'Linear algebra, real analysis, differential equations, and mathematical physics.',
  },
  {
    id: 'br-bcom-acc',
    slug: 'bcom-acc',
    courseId: 'course-bcom',
    code: 'BCOM-ACC',
    name: 'Accounting, Law & Taxation',
    description: 'Ind-AS financial reporting, Companies Act 2013, and Indian Income Tax computation.',
  },
  {
    id: 'br-dip-cse',
    slug: 'dip-cse',
    courseId: 'course-diploma',
    code: 'DIP-CSE',
    name: 'Computer Science & Engineering (Diploma)',
    description: 'Applied mathematics, C data structures, database lab, and web basics.',
  },
  {
    id: 'br-dip-me',
    slug: 'dip-me',
    courseId: 'course-diploma',
    code: 'DIP-ME',
    name: 'Mechanical Engineering (Diploma)',
    description: 'Applied mathematics, thermodynamics, fluid mechanics, and manufacturing processes.',
  },
];

interface RawSubjectDef {
  code: string;
  name: string;
  universityId: string;
  courseId: string;
  branchIds: string[];
  semester: number;
  credits: number;
  category: Subject['category'];
  summary: string;
  keyFormulaHint: string;
  units: Array<{ title: string; topics: string[] }>;
}

const RAW_WIDE_SUBJECTS: RawSubjectDef[] = [
  // ===== BCA (4 Subjects across Sem 1, 3, 4, 5) =====
  {
    code: 'BCA101',
    name: 'Programming Principles & C Language',
    universityId: 'uni-aktu',
    courseId: 'course-bca',
    branchIds: ['br-bca-core', 'br-bca-ds'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Algorithmic problem solving, C syntax, control flow, pointers, structures, and file I/O.',
    keyFormulaHint: 'Pointer arithmetic: `*(arr + i) == arr[i]`; recursion base case + recurrence relation.',
    units: [
      {
        title: 'Problem Solving & C Fundamentals',
        topics: [
          'Flowcharts, pseudocode, and structured programming methodology',
          'Data types, operators, precedence, and type conversion in C',
          'Formatted console I/O (printf/scanf) and compilation pipeline',
        ],
      },
      {
        title: 'Control Flow & Functions',
        topics: [
          'Branching statements (if-else, switch-case) and looping constructs',
          'User-defined functions, call by value vs call by reference',
          'Storage classes (auto, static, extern, register) and recursion',
        ],
      },
      {
        title: 'Arrays & Strings',
        topics: [
          '1D and 2D array memory representation and matrix operations',
          'Null-terminated strings and standard string.h library functions',
          'Searching (linear, binary) and sorting (bubble, insertion) basics',
        ],
      },
      {
        title: 'Pointers & Dynamic Memory',
        topics: [
          'Pointer declarations, pointer arithmetic, and pointer-to-array relations',
          'Dynamic allocation with malloc, calloc, realloc, and free',
          'Avoiding dangling pointers and memory leaks',
        ],
      },
      {
        title: 'Structures, Unions & File Handling',
        topics: [
          'Structures, nested structures, typedef, and memory layout of unions',
          'Text vs binary file operations (fopen, fread, fwrite, fseek)',
          'Command-line arguments and C preprocessor macros',
        ],
      },
    ],
  },
  {
    code: 'BCA301',
    name: 'Object-Oriented Programming with Java',
    universityId: 'uni-aktu',
    courseId: 'course-bca',
    branchIds: ['br-bca-core', 'br-bca-ds'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'JVM architecture, classes, inheritance, polymorphism, exception handling, multithreading, and Collections.',
    keyFormulaHint: 'Runtime polymorphism = superclass reference holding subclass instance + overridden method.',
    units: [
      {
        title: 'Java Architecture & Core Syntax',
        topics: [
          'JVM, JRE, JDK, bytecode verification, and platform independence',
          'Classes, objects, constructors, this keyword, and garbage collection',
          'Access modifiers and static members',
        ],
      },
      {
        title: 'Inheritance, Interfaces & Polymorphism',
        topics: [
          'Single, multilevel, hierarchical inheritance and super keyword',
          'Method overloading vs overriding and dynamic method dispatch',
          'Abstract classes, interfaces, and packages',
        ],
      },
      {
        title: 'Exception Handling & I/O Streams',
        topics: [
          'Checked vs unchecked exceptions, try-catch-finally, throw and throws',
          'Custom exception classes for domain validation',
          'Byte streams, character streams, and object serialization',
        ],
      },
      {
        title: 'Multithreading & Synchronization',
        topics: [
          'Thread lifecycle, extending Thread vs implementing Runnable',
          'Synchronized blocks, intrinsic locks, and inter-thread communication',
          'Preventing race conditions and deadlocks',
        ],
      },
      {
        title: 'Collections Framework & JDBC Basics',
        topics: [
          'List, Set, Queue, and Map interfaces (ArrayList, HashSet, HashMap)',
          'Generics, iterators, Comparable vs Comparator',
          'JDBC architecture, DriverManager, PreparedStatement, and ResultSet',
        ],
      },
    ],
  },
  {
    code: 'BCA401',
    name: 'Database Management Systems & SQL',
    universityId: 'uni-aktu',
    courseId: 'course-bca',
    branchIds: ['br-bca-core', 'br-bca-ds'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary: 'ER modeling, relational algebra, SQL DDL/DML/Joins, normalization up to BCNF, and ACID transactions.',
    keyFormulaHint: 'Lossless join condition: `(R1 ∩ R2) -> R1` or `(R1 ∩ R2) -> R2`.',
    units: [
      {
        title: 'DBMS Architecture & ER Modeling',
        topics: [
          'Three-schema architecture and logical/physical data independence',
          'Entities, attributes, cardinality ratios, and weak entity sets',
          'Mapping ER diagrams to relational tables',
        ],
      },
      {
        title: 'Relational Model & Algebra',
        topics: [
          'Super keys, candidate keys, primary keys, and referential integrity',
          'Selection, projection, join, division, and set operations',
          'Views and relational calculus overview',
        ],
      },
      {
        title: 'Structured Query Language (SQL)',
        topics: [
          'DDL constraints (PRIMARY, FOREIGN, UNIQUE, CHECK) and DML queries',
          'INNER, LEFT, RIGHT, FULL joins and correlated subqueries',
          'GROUP BY, HAVING, aggregate functions, and indexes',
        ],
      },
      {
        title: 'Normalization & Schema Refinement',
        topics: [
          'Functional dependencies, Armstrong axioms, and attribute closure',
          '1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF)',
          'Lossless-join and dependency-preserving decompositions',
        ],
      },
      {
        title: 'Transactions, Concurrency & Recovery',
        topics: [
          'ACID properties and transaction state diagram',
          'Conflict serializability and Two-Phase Locking (2PL)',
          'Write-ahead logging (WAL) and checkpoint-based crash recovery',
        ],
      },
    ],
  },
  {
    code: 'BCA501',
    name: 'Web Technologies & Full-Stack Foundations',
    universityId: 'uni-aktu',
    courseId: 'course-bca',
    branchIds: ['br-bca-core'],
    semester: 5,
    credits: 4,
    category: 'Core',
    summary: 'HTTP/DNS architecture, semantic HTML5, responsive CSS3, modern JavaScript DOM/Fetch, and REST APIs.',
    keyFormulaHint: 'REST semantics: GET (read), POST (create), PUT/PATCH (update), DELETE (remove) + status codes.',
    units: [
      {
        title: 'Internet Protocols & Web Architecture',
        topics: [
          'Client-server model, DNS resolution, and HTTP/HTTPS request-response lifecycle',
          'Status codes, headers, cookies, sessions, and CORS fundamentals',
          'Static vs dynamic web application architecture',
        ],
      },
      {
        title: 'Semantic HTML5 & Accessibility',
        topics: [
          'Document outline, landmarks, forms, and native input validation',
          'Tables, media embeds, and SEO metadata tags',
          'WCAG accessibility attributes and keyboard navigation',
        ],
      },
      {
        title: 'Modern CSS3 & Responsive Design',
        topics: [
          'Box model, specificity, cascade, and CSS custom properties',
          'Flexbox and CSS Grid layouts for mobile-first design',
          'Media queries and fluid typography',
        ],
      },
      {
        title: 'JavaScript, DOM & Async Programming',
        topics: [
          'ES6+ syntax, closures, event bubbling, and DOM manipulation',
          'Promises, async/await, and the browser event loop',
          'Fetch API, JSON parsing, and client-side state persistence',
        ],
      },
      {
        title: 'REST APIs & Web Security Essentials',
        topics: [
          'Designing clean REST endpoints with input validation',
          'Preventing XSS, CSRF, and SQL injection vulnerabilities',
          'Caching headers and static asset deployment workflows',
        ],
      },
    ],
  },

  // ===== MCA (3 Subjects across Sem 1, 2, 3) =====
  {
    code: 'KCA101',
    name: 'Fundamentals of Computing & Emerging Technologies',
    universityId: 'uni-aktu',
    courseId: 'course-mca',
    branchIds: ['br-mca-se', 'br-mca-ai'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Computer organization, OS internals, cloud service models, IoT ecosystems, and cybersecurity fundamentals.',
    keyFormulaHint: 'Amdahl Law speedup: `S = 1 / ((1 - p) + p / N)`.',
    units: [
      {
        title: 'Digital Computer Architecture',
        topics: [
          'Von Neumann architecture, ALU, control unit, and instruction cycle',
          'Memory hierarchy: registers, L1/L2/L3 cache, RAM, and secondary storage',
          'Number systems, 2s complement arithmetic, and logic gates',
        ],
      },
      {
        title: 'Operating System & Networking Essentials',
        topics: [
          'Process scheduling, virtual memory paging, and file systems',
          'OSI vs TCP/IP models, IPv4/IPv6 addressing, and routing basics',
          'Virtualization, hypervisors, and container isolation',
        ],
      },
      {
        title: 'Cloud Computing Architectures',
        topics: [
          'IaaS, PaaS, SaaS, and serverless edge computing models',
          'Horizontal vs vertical scaling, load balancing, and fault tolerance',
          'Distributed storage consistency and CAP theorem overview',
        ],
      },
      {
        title: 'IoT & Distributed Ledger Basics',
        topics: [
          'Sensor nodes, MQTT/CoAP lightweight messaging, and edge gateways',
          'Cryptographic hashing, Merkle trees, and consensus mechanisms',
          'Real-world industrial and smart-campus use cases',
        ],
      },
      {
        title: 'Cybersecurity & Ethical Computing',
        topics: [
          'CIA triad, symmetric vs asymmetric encryption, and TLS/PKI',
          'OWASP Top 10 web risks and zero-trust security principles',
          'Data privacy compliance and open-source licensing ethics',
        ],
      },
    ],
  },
  {
    code: 'KCA201',
    name: 'Data Structures & Analysis of Algorithms',
    universityId: 'uni-aktu',
    courseId: 'course-mca',
    branchIds: ['br-mca-se', 'br-mca-ai'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary: 'Asymptotic analysis, balanced trees, heaps, divide & conquer, greedy algorithms, DP, and NP-completeness.',
    keyFormulaHint: 'Master Theorem: `T(n) = aT(n/b) + f(n)` compared against `n^(log_b a)`.',
    units: [
      {
        title: 'Asymptotic Complexity & Recurrences',
        topics: [
          'Big-O, Big-Omega, Big-Theta notations and amortized analysis',
          'Substitution method, recursion tree, and Master Theorem',
          'Space-time trade-offs in algorithm design',
        ],
      },
      {
        title: 'Advanced Trees & Heaps',
        topics: [
          'AVL trees, Red-Black tree properties, and B/B+ tree indexing',
          'Binary heaps, priority queues, and Heap Sort O(n log n)',
          'Hashing with chaining, open addressing, and load factor tuning',
        ],
      },
      {
        title: 'Divide & Conquer and Greedy Strategies',
        topics: [
          'Merge Sort, Quick Sort average vs worst case, and Strassen multiplication',
          'Activity selection, Huffman coding, and fractional knapsack',
          'Kruskal and Prim minimum spanning tree algorithms',
        ],
      },
      {
        title: 'Dynamic Programming & Graph Algorithms',
        topics: [
          '0/1 Knapsack, Longest Common Subsequence, and Matrix Chain Multiplication',
          'BFS, DFS, topological sorting, and strongly connected components',
          'Dijkstra, Bellman-Ford, and Floyd-Warshall shortest paths',
        ],
      },
      {
        title: 'Backtracking, Branch & Bound & NP Theory',
        topics: [
          'N-Queens, Subset Sum, and Graph Coloring via backtracking',
          'P, NP, NP-Complete, and NP-Hard problem reductions (SAT, TSP)',
          'Approximation algorithms for intractable problems',
        ],
      },
    ],
  },
  {
    code: 'KCA301',
    name: 'Artificial Intelligence & Machine Learning',
    universityId: 'uni-aktu',
    courseId: 'course-mca',
    branchIds: ['br-mca-ai', 'br-mca-se'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'Heuristic search, knowledge representation, supervised/unsupervised learning, evaluation metrics, and neural nets.',
    keyFormulaHint: 'A* cost: `f(n) = g(n) + h(n)`; Bayes: `P(H|E) = P(E|H)P(H) / P(E)`; F1 = `2PR/(P+R)`.',
    units: [
      {
        title: 'Intelligent Agents & State-Space Search',
        topics: [
          'PEAS task environments and rational agent architectures',
          'Uninformed search (BFS, DFS, IDS) vs informed search (Greedy, A*)',
          'Adversarial search: Minimax and Alpha-Beta pruning',
        ],
      },
      {
        title: 'Knowledge Representation & Probabilistic Reasoning',
        topics: [
          'Propositional logic, First-Order Logic (FOL), and resolution refutation',
          'Bayes theorem, Bayesian belief networks, and conditional independence',
          'Handling uncertainty and decision theory basics',
        ],
      },
      {
        title: 'Supervised Learning Algorithms',
        topics: [
          'Linear and logistic regression, gradient descent, and regularization (L1/L2)',
          'Decision trees (ID3/CART), entropy, Gini impurity, and Random Forests',
          'Support Vector Machines (kernel trick) and k-Nearest Neighbours',
        ],
      },
      {
        title: 'Unsupervised Learning & Model Evaluation',
        topics: [
          'k-Means clustering, hierarchical clustering, and DBSCAN',
          'Principal Component Analysis (PCA) for dimensionality reduction',
          'Bias-variance trade-off, k-fold cross-validation, ROC-AUC, and F1 score',
        ],
      },
      {
        title: 'Neural Networks & Responsible AI',
        topics: [
          'Perceptrons, multilayer perceptrons, activation functions, and backpropagation',
          'Overfitting controls: dropout, batch normalization, and early stopping',
          'Dataset bias, explainability, and ethical deployment practices',
        ],
      },
    ],
  },

  // ===== MBA (4 Subjects across Sem 1 & 2) =====
  {
    code: 'KMBN101',
    name: 'Management Concepts & Organisational Behaviour',
    universityId: 'uni-aktu',
    courseId: 'course-mba',
    branchIds: ['br-mba-fin', 'br-mba-mkt'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Classical to modern management theory, planning, decision making, motivation, leadership, and organisational culture.',
    keyFormulaHint: 'POLC Framework: Planning → Organising → Leading → Controlling.',
    units: [
      {
        title: 'Foundations of Management Thought',
        topics: [
          'Taylor Scientific Management, Fayol 14 Principles, and Weber Bureaucracy',
          'Hawthorne experiments, systems approach, and contingency theory',
          'Managerial roles (Mintzberg) and core competency levels',
        ],
      },
      {
        title: 'Planning, Decision-Making & Organising',
        topics: [
          'Strategic vs operational planning and Management by Objectives (MBO)',
          'Bounded rationality, decision trees, and risk vs uncertainty',
          'Span of control, delegation, centralization, and matrix structures',
        ],
      },
      {
        title: 'Individual Behaviour & Motivation Theories',
        topics: [
          'Big Five personality traits, perception biases, and learning theories',
          'Maslow Hierarchy, Herzberg Two-Factor, and McClelland Needs theory',
          'Vroom Expectancy theory and Adams Equity theory',
        ],
      },
      {
        title: 'Group Dynamics & Leadership',
        topics: [
          'Tuckman stages of team formation, norms, cohesiveness, and groupthink',
          'Trait, behavioural (Blake-Mouton), and situational leadership models',
          'Transformational vs transactional leadership and conflict resolution',
        ],
      },
      {
        title: 'Organisational Culture, Change & Control',
        topics: [
          'Schein levels of culture and organisational socialization',
          'Lewin 3-step change model and Kotter 8-step change leadership',
          'Balanced Scorecard and strategic management control systems',
        ],
      },
    ],
  },
  {
    code: 'KMBN102',
    name: 'Managerial Economics',
    universityId: 'uni-aktu',
    courseId: 'course-mba',
    branchIds: ['br-mba-fin', 'br-mba-mkt'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Demand elasticity, production & cost curves, market structures, pricing strategies, and macroeconomic indicators.',
    keyFormulaHint: 'Profit Maximization: `MR = MC`; Price Elasticity: `Ed = (%ΔQ) / (%ΔP)`.',
    units: [
      {
        title: 'Scope of Managerial Economics & Demand Analysis',
        topics: [
          'Opportunity cost, incremental principle, and discounting principle',
          'Law of demand, determinants, and demand forecasting techniques',
          'Price, income, and cross-price elasticity of demand',
        ],
      },
      {
        title: 'Production Functions & Cost Analysis',
        topics: [
          'Law of variable proportions and returns to scale (Cobb-Douglas)',
          'Isoquants, isocost lines, and producer equilibrium',
          'Short-run vs long-run average cost curves and break-even analysis',
        ],
      },
      {
        title: 'Market Structures & Equilibrium',
        topics: [
          'Perfect competition: short-run and long-run firm equilibrium',
          'Monopoly, price discrimination (1st, 2nd, 3rd degree), and deadweight loss',
          'Monopolistic competition and oligopoly (kinked demand, game theory)',
        ],
      },
      {
        title: 'Pricing Practices & Capital Decisions',
        topics: [
          'Cost-plus, skimming, penetration, and transfer pricing strategies',
          'Peak-load pricing and multi-product pricing decisions',
          'Demand for capital and risk-adjusted return principles',
        ],
      },
      {
        title: 'Macroeconomic Environment for Business',
        topics: [
          'GDP, GNP, National Income accounting, and inflation indices (CPI/WPI)',
          'Business cycles and monetary vs fiscal policy instruments (RBI tools)',
          'Balance of payments and exchange-rate impacts on Indian firms',
        ],
      },
    ],
  },
  {
    code: 'KMBN201',
    name: 'Financial Management & Corporate Finance',
    universityId: 'uni-aktu',
    courseId: 'course-mba',
    branchIds: ['br-mba-fin', 'br-mba-mkt'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary: 'Time value of money, capital budgeting (NPV/IRR), cost of capital (WACC), capital structure, and working capital.',
    keyFormulaHint: 'NPV = `Σ CF_t / (1 + r)^t − C_0`; CAPM: `Ke = Rf + β(Rm − Rf)`.',
    units: [
      {
        title: 'Financial Objectives & Time Value of Money',
        topics: [
          'Profit maximization vs shareholder wealth maximization and agency problem',
          'Compounding, discounting, annuities, and perpetuities',
          'Valuation of bonds and equity shares (Dividend Discount Model)',
        ],
      },
      {
        title: 'Capital Budgeting Decisions',
        topics: [
          'Cash flow estimation: initial outlay, operating inflows, terminal value',
          'Payback Period, ARR, NPV, IRR, and Profitability Index comparisons',
          'Capital rationing and risk analysis (sensitivity & scenario analysis)',
        ],
      },
      {
        title: 'Cost of Capital & Leverage Analysis',
        topics: [
          'Cost of debt (Kd), preference shares (Kp), and equity (CAPM / Gordon)',
          'Weighted Average Cost of Capital (WACC) using market value weights',
          'Operating leverage (DOL), financial leverage (DFL), and combined leverage',
        ],
      },
      {
        title: 'Capital Structure & Dividend Policy',
        topics: [
          'Net Income, Net Operating Income, and Modigliani-Miller propositions',
          'EBIT-EPS indifference analysis and optimal debt-equity mix',
          'Walter model, Gordon model, and MM dividend irrelevance hypothesis',
        ],
      },
      {
        title: 'Working Capital Management',
        topics: [
          'Operating cycle, cash conversion cycle, and working capital estimation',
          'Cash management (Baumol & Miller-Orr) and receivables credit policy',
          'Inventory control: EOQ, reorder level, and ABC analysis',
        ],
      },
    ],
  },
  {
    code: 'KMBN202',
    name: 'Marketing Management & Strategy',
    universityId: 'uni-aktu',
    courseId: 'course-mba',
    branchIds: ['br-mba-mkt', 'br-mba-fin'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary: 'STP framework, consumer behaviour, 4Ps/7Ps marketing mix, brand equity, channels, and digital marketing metrics.',
    keyFormulaHint: 'STP → 4Ps (Product, Price, Place, Promotion); Customer Lifetime Value (CLV).',
    units: [
      {
        title: 'Core Marketing Concepts & Environment',
        topics: [
          'Needs, wants, demand, value proposition, and holistic marketing',
          'PESTEL macro-environment and Porter Five Forces industry analysis',
          'Marketing research process and primary vs secondary data design',
        ],
      },
      {
        title: 'Consumer Behaviour & STP Strategy',
        topics: [
          'Five-stage consumer buying decision process and cognitive dissonance',
          'Demographic, psychographic, and behavioural market segmentation',
          'Targeting strategies, differentiation, and perceptual positioning maps',
        ],
      },
      {
        title: 'Product & Brand Management',
        topics: [
          'Product levels, product mix width/depth, and new product development',
          'Product Life Cycle (PLC) stages and stage-specific strategies',
          'Keller Brand Equity pyramid, brand extensions, and packaging',
        ],
      },
      {
        title: 'Pricing & Distribution Channels',
        topics: [
          'Value-based, competition-based, and psychological pricing models',
          'Channel design, omnichannel retail, and channel conflict resolution',
          'Logistics, warehousing, and B2B vs B2C distribution dynamics',
        ],
      },
      {
        title: 'Integrated Marketing Communications & Digital',
        topics: [
          'IMC mix: advertising, sales promotion, PR, direct and personal selling',
          'Search, content, social media funnels, CAC, ROAS, and conversion rate',
          'Ethical marketing and consumer protection regulations',
        ],
      },
    ],
  },

  // ===== B.PHARM (3 Subjects across Sem 1, 3, 4) =====
  {
    code: 'BP101T',
    name: 'Human Anatomy & Physiology I',
    universityId: 'uni-aktu',
    courseId: 'course-bpharm',
    branchIds: ['br-bpharm-core'],
    semester: 1,
    credits: 4,
    category: 'Basic Science',
    summary: 'Cellular homeostasis, tissue classification, skeletal & muscular systems, haematology, and cardiovascular physiology.',
    keyFormulaHint: 'Cardiac Output: `CO = HR × SV`; Blood Pressure: `BP = CO × TPR`.',
    units: [
      {
        title: 'Introduction to Human Body & Cellular Level',
        topics: [
          'Anatomical terminology, body cavities, and negative/positive feedback homeostasis',
          'Plasma membrane transport, organelle functions, and cell division (mitosis/meiosis)',
          'Epithelial, connective, muscular, and nervous tissue classification',
        ],
      },
      {
        title: 'Integumentary & Skeletal System',
        topics: [
          'Structure and protective/thermoregulatory functions of skin layers',
          'Axial and appendicular skeleton, bone ossification, and calcium homeostasis',
          'Classification and mechanics of fibrous, cartilaginous, and synovial joints',
        ],
      },
      {
        title: 'Body Fluids, Blood & Lymphatic System',
        topics: [
          'Composition of blood, erythropoiesis, haemoglobin, and anaemia types',
          'Intrinsic and extrinsic coagulation cascades and ABO/Rh blood grouping',
          'Lymph circulation, lymph nodes, spleen, and innate immune defense',
        ],
      },
      {
        title: 'Peripheral Nervous System & Special Senses',
        topics: [
          'Sympathetic vs parasympathetic autonomic divisions and neurotransmitters',
          'Cranial nerves overview and neuromuscular junction physiology',
          'Anatomy and physiology of eye, ear, nose, and tongue',
        ],
      },
      {
        title: 'Cardiovascular System',
        topics: [
          'Heart chambers, valves, SA/AV conduction system, and ECG waveform (P-QRS-T)',
          'Cardiac cycle phases, stroke volume, and Frank-Starling law',
          'Regulation of arterial blood pressure and hypertension pathophysiology',
        ],
      },
    ],
  },
  {
    code: 'BP103T',
    name: 'Pharmaceutics I (Dosage Forms & Dispensing)',
    universityId: 'uni-aktu',
    courseId: 'course-bpharm',
    branchIds: ['br-bpharm-core'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Indian Pharmacopoeia, prescriptions, posology, powders, liquid dosage forms, emulsions, suspensions, and incompatibilities.',
    keyFormulaHint: 'Young Rule (child dose): `(Age / (Age + 12)) × Adult Dose`; Alligation medial/alternate.',
    units: [
      {
        title: 'Pharmacopoeias, Prescriptions & Posology',
        topics: [
          'History of pharmacy in India and monographs in Indian Pharmacopoeia (IP)',
          'Parts of a prescription, handling procedures, and dispensing errors',
          'Posology calculations: Young, Dilling, Clark, and body-surface-area rules',
        ],
      },
      {
        title: 'Pharmaceutical Calculations & Powders',
        topics: [
          'Imperial/metric conversions, proof spirit, isotonicity, and alligation',
          'Simple, compound, effervescent, and hygroscopic pharmaceutical powders',
          'Geometric dilution and dustings/insufflations formulation',
        ],
      },
      {
        title: 'Monophasic Liquid Dosage Forms',
        topics: [
          'Solubility enhancement techniques and vehicles/excipients selection',
          'Syrups, elixirs, linctuses, gargles, mouthwashes, and nasal drops',
          'Preservatives, antioxidants, buffers, and organoleptic additives',
        ],
      },
      {
        title: 'Biphasic Liquids: Suspensions & Emulsions',
        topics: [
          'Flocculated vs deflocculated suspensions and Stokes sedimentation law',
          'HLB scale, emulsifying agents, and O/W vs W/O identification tests',
          'Emulsion instability: creaming, cracking, phase inversion, and prevention',
        ],
      },
      {
        title: 'Suppositories, Semisolids & Incompatibilities',
        topics: [
          'Suppository bases, displacement value calculations, and molding methods',
          'Ointment, cream, paste, and gel bases with preparation methods',
          'Physical, chemical, and therapeutic prescription incompatibilities',
        ],
      },
    ],
  },
  {
    code: 'BP404T',
    name: 'Pharmacology I',
    universityId: 'uni-aktu',
    courseId: 'course-bpharm',
    branchIds: ['br-bpharm-core'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary: 'Pharmacokinetics (ADME), pharmacodynamics, receptor families, ANS drugs, and CNS therapeutics.',
    keyFormulaHint: 'Therapeutic Index: `TI = LD50 / ED50`; Clearance: `CL = Rate of elimination / Cp`.',
    units: [
      {
        title: 'General Pharmacology & Pharmacokinetics',
        topics: [
          'Routes of drug administration, first-pass metabolism, and bioavailability',
          'ADME: membrane absorption, volume of distribution (Vd), and plasma protein binding',
          'Phase I/II hepatic biotransformation (CYP450) and renal half-life (t1/2)',
        ],
      },
      {
        title: 'Pharmacodynamics & Clinical Safety',
        topics: [
          'GPCR, ion-channel, enzyme-linked, and nuclear receptor mechanisms',
          'Graded vs quantal dose-response curves, potency, efficacy, and antagonism',
          'Adverse drug reactions (ADRs), pharmacovigilance, and drug interactions',
        ],
      },
      {
        title: 'Pharmacology of Peripheral Nervous System',
        topics: [
          'Cholinergic agonists, anticholinesterases, and muscarinic blockers',
          'Adrenergic sympathomimetics, alpha/beta blockers, and clinical uses',
          'Neuromuscular blockers and local anaesthetic mechanisms',
        ],
      },
      {
        title: 'Central Nervous System Pharmacology I',
        topics: [
          'GABAergic transmission, benzodiazepines, and sedative-hypnotics',
          'General anaesthetics (inhalation & intravenous) and stages of anaesthesia',
          'Anti-epileptic drug classes and seizure pathway modulation',
        ],
      },
      {
        title: 'Central Nervous System Pharmacology II',
        topics: [
          'Antipsychotics, antidepressants (SSRI/SNRI/TCA), and anxiolytics',
          'Anti-Parkinsonian therapy (Levodopa-Carbidopa) and Alzheimer drugs',
          'Opioid analgesics, antagonists (Naloxone), and dependence management',
        ],
      },
    ],
  },

  // ===== BBA (3 Subjects across Sem 1, 2, 3) =====
  {
    code: 'BBA101',
    name: 'Principles of Management & Business Organisation',
    universityId: 'uni-du',
    courseId: 'course-bba',
    branchIds: ['br-bba-gen', 'br-bba-fin'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Business ownership forms, management functions, strategic planning, staffing, communication, and control.',
    keyFormulaHint: 'SWOT Matrix = Internal (Strengths, Weaknesses) + External (Opportunities, Threats).',
    units: [
      {
        title: 'Nature of Business & Management',
        topics: [
          'Sole proprietorship, partnership, LLP, and joint-stock company structures',
          'Management as science, art, and profession; levels of management',
          'Evolution from classical to modern contingency management',
        ],
      },
      {
        title: 'Planning & Strategic Decision Making',
        topics: [
          'Vision, mission, goals, policies, and SWOT environmental scanning',
          'Steps in rational decision-making and brainstorming/Delphi techniques',
          'Forecasting essentials and planning premises',
        ],
      },
      {
        title: 'Organising & Authority Relationships',
        topics: [
          'Departmentation bases: functional, divisional, geographic, and matrix',
          'Line vs staff authority, delegation barriers, and decentralization',
          'Formal vs informal workplace networks',
        ],
      },
      {
        title: 'Staffing, Directing & Communication',
        topics: [
          'Recruitment, selection, training, and performance appraisal methods',
          'Leadership styles, employee motivation basics, and supervision',
          'Formal communication channels and overcoming communication barriers',
        ],
      },
      {
        title: 'Controlling & Corporate Ethics',
        topics: [
          'Control process, budgetary control, PERT/CPM basics, and KPI dashboards',
          'Corporate Social Responsibility (CSR) and business ethics in India',
          'Contemporary trends: digital transformation and hybrid teams',
        ],
      },
    ],
  },
  {
    code: 'BBA201',
    name: 'Financial Accounting & Statement Analysis',
    universityId: 'uni-du',
    courseId: 'course-bba',
    branchIds: ['br-bba-fin', 'br-bba-gen'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary: 'Double-entry bookkeeping, trial balance, depreciation, final accounts, cash flow statements, and financial ratios.',
    keyFormulaHint: 'Accounting Equation: `Assets = Liabilities + Equity`; Current Ratio = `CA / CL`.',
    units: [
      {
        title: 'Accounting Principles & Double-Entry Cycle',
        topics: [
          'GAAP, Ind-AS concepts: accrual, going concern, matching, and prudence',
          'Journal entries, ledger posting, cash book, and subsidiary books',
          'Trial balance preparation and rectification of accounting errors',
        ],
      },
      {
        title: 'Depreciation & Inventory Valuation',
        topics: [
          'Straight-Line Method (SLM) vs Written Down Value (WDV) depreciation',
          'FIFO, LIFO, and Weighted Average inventory valuation methods',
          'Bank Reconciliation Statement (BRS) preparation',
        ],
      },
      {
        title: 'Final Accounts of Sole Proprietors & Companies',
        topics: [
          'Trading account, Profit & Loss account, and Balance Sheet adjustments',
          'Schedule III vertical financial statement format basics',
          'Capital vs revenue expenditure classification',
        ],
      },
      {
        title: 'Cash Flow & Fund Flow Statements',
        topics: [
          'Operating, Investing, and Financing cash flow classification (AS-3)',
          'Indirect method cash flow preparation from comparative balance sheets',
          'Working capital changes and liquidity interpretation',
        ],
      },
      {
        title: 'Financial Ratio Analysis',
        topics: [
          'Liquidity ratios (Current, Quick) and Solvency ratios (Debt-Equity, ICR)',
          'Activity ratios (Inventory turnover, Debtors turnover)',
          'Profitability ratios (Gross/Net margin, ROA, ROE, EPS, DuPont analysis)',
        ],
      },
    ],
  },
  {
    code: 'BBA301',
    name: 'Business Law & Regulatory Framework',
    universityId: 'uni-du',
    courseId: 'course-bba',
    branchIds: ['br-bba-gen', 'br-bba-fin'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'Indian Contract Act 1872, Sale of Goods Act, Negotiable Instruments, LLP Act, and Consumer Protection Act 2019.',
    keyFormulaHint: 'Valid Contract = Offer + Acceptance + Lawful Consideration + Capacity + Free Consent.',
    units: [
      {
        title: 'Indian Contract Act, 1872 — Formation',
        topics: [
          'Essentials of a valid contract, offer, acceptance, and revocation',
          'Consideration, privity of contract, and contractual capacity',
          'Free consent: coercion, undue influence, fraud, misrepresentation, mistake',
        ],
      },
      {
        title: 'Performance, Breach & Special Contracts',
        topics: [
          'Discharge of contract, impossibility/frustration, and remedies for breach',
          'Indemnity, guarantee, bailment, pledge, and contract of agency',
          'Void, voidable, contingent, and quasi-contracts',
        ],
      },
      {
        title: 'Sale of Goods Act, 1930',
        topics: [
          'Sale vs agreement to sell, conditions vs warranties, and caveat emptor',
          'Transfer of ownership (nemo dat quod non habet) and exceptions',
          'Rights of an unpaid seller (lien, stoppage in transit, resale)',
        ],
      },
      {
        title: 'Negotiable Instruments & LLP Act',
        topics: [
          'Promissory notes, bills of exchange, cheques, crossing, and dishonour (Sec 138)',
          'Holder vs holder in due course and endorsement types',
          'Limited Liability Partnership (LLP) incorporation and partner liabilities',
        ],
      },
      {
        title: 'Consumer Protection & IT Act Essentials',
        topics: [
          'Consumer Protection Act 2019: consumer rights and 3-tier redressal commissions',
          'E-commerce liabilities and unfair trade practices',
          'Information Technology Act: digital signatures and electronic contracts',
        ],
      },
    ],
  },

  // ===== B.SC HONS (3 Subjects across Sem 1, 2, 3) =====
  {
    code: 'BSC101',
    name: 'Programming Fundamentals using Python',
    universityId: 'uni-du',
    courseId: 'course-bsc',
    branchIds: ['br-bsc-cs', 'br-bsc-math'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Python core data structures, functions, OOP, file handling, NumPy arrays, and algorithmic problem solving.',
    keyFormulaHint: 'List comprehension: `[expr for x in iterable if cond]`; dict average lookup `O(1)`.',
    units: [
      {
        title: 'Python Basics & Control Structures',
        topics: [
          'Interpreter execution model, dynamic typing, and immutable vs mutable types',
          'Expressions, conditional branching, loops, and comprehensions',
          'Debugging, docstrings, and PEP-8 clean code conventions',
        ],
      },
      {
        title: 'Functions, Recursion & Modules',
        topics: [
          'Positional, keyword, default, *args/**kwargs, and lambda functions',
          'LEGB variable scoping, closures, and recursive problem decomposition',
          'Standard library modules (math, random, datetime, collections)',
        ],
      },
      {
        title: 'Core Data Structures in Python',
        topics: [
          'Lists, tuples, slicing, and shallow vs deep copy semantics',
          'Sets, dictionaries, hashing, and frequency-counting patterns',
          'String formatting, regular expressions, and text parsing',
        ],
      },
      {
        title: 'Object-Oriented Programming & Exceptions',
        topics: [
          'Classes, __init__, dunder methods, inheritance, and polymorphism',
          'Exception handling (try-except-else-finally) and custom exceptions',
          'Context managers (with statement) for CSV/JSON file processing',
        ],
      },
      {
        title: 'Scientific Computing Basics',
        topics: [
          'NumPy ndarray creation, broadcasting, and vectorized matrix math',
          'Basic plotting concepts and tabular data inspection',
          'Writing unit tests with unittest/pytest for reliable code',
        ],
      },
    ],
  },
  {
    code: 'BSC201',
    name: 'Linear Algebra & Real Analysis',
    universityId: 'uni-du',
    courseId: 'course-bsc',
    branchIds: ['br-bsc-math', 'br-bsc-cs'],
    semester: 2,
    credits: 4,
    category: 'Basic Science',
    summary: 'Vector spaces, linear transformations, eigenvalues, inner product spaces, real sequences, and Riemann integration.',
    keyFormulaHint: 'Rank-Nullity: `dim(V) = rank(T) + nullity(T)`; Characteristic eq: `det(A − λI) = 0`.',
    units: [
      {
        title: 'Vector Spaces & Subspaces',
        topics: [
          'Vector space axioms, subspaces, linear span, and linear independence',
          'Basis, dimension theorem, and row/column space rank of matrices',
          'Solving homogeneous and non-homogeneous linear systems (Gauss-Jordan)',
        ],
      },
      {
        title: 'Linear Transformations & Matrices',
        topics: [
          'Kernel, image, Rank-Nullity theorem, and matrix representation',
          'Change of basis matrices and similarity transformations',
          'Dual spaces and invertibility criteria',
        ],
      },
      {
        title: 'Eigenvalues, Diagonalization & Inner Products',
        topics: [
          'Characteristic polynomial, eigenvalues, eigenvectors, and Cayley-Hamilton',
          'Diagonalization of symmetric matrices and Gram-Schmidt orthogonalization',
          'Orthogonal projections and least-squares approximation',
        ],
      },
      {
        title: 'Real Sequences & Infinite Series',
        topics: [
          'Completeness axiom of R, monotone convergence, and Cauchy sequences',
          'Bolzano-Weierstrass theorem and limit superior/inferior',
          'Convergence tests: Comparison, Ratio, Root, Alternating (Leibniz)',
        ],
      },
      {
        title: 'Continuity, Differentiability & Integration',
        topics: [
          'Epsilon-delta continuity, uniform continuity, and Intermediate Value Theorem',
          'Rolle theorem, Mean Value Theorem, and Taylor series expansions',
          'Riemann sums, integrability criteria, and Fundamental Theorem of Calculus',
        ],
      },
    ],
  },
  {
    code: 'BSC301',
    name: 'Operating Systems & Computer Networks',
    universityId: 'uni-du',
    courseId: 'course-bsc',
    branchIds: ['br-bsc-cs'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'Process management, synchronization, virtual memory, TCP/IP stack, subnetting, routing, and application protocols.',
    keyFormulaHint: 'Effective Access Time: `EAT = (1 − p)·ma + p·page_fault_time`; CIDR hosts = `2^(32−n) − 2`.',
    units: [
      {
        title: 'OS Processes & CPU Scheduling',
        topics: [
          'System calls, kernel/user mode, process states, and context switching',
          'FCFS, SJF, Priority, and Round-Robin scheduling metrics',
          'Multithreading models and POSIX thread primitives',
        ],
      },
      {
        title: 'Synchronization, Deadlocks & Memory',
        topics: [
          'Critical section problem, semaphores, mutexes, and Banker algorithm',
          'Paging, segmentation, TLB hit ratios, and page replacement (LRU/FIFO)',
          'Thrashing, working-set model, and disk scheduling',
        ],
      },
      {
        title: 'Physical & Data Link Layers',
        topics: [
          'OSI vs TCP/IP layered architecture, bandwidth, and latency',
          'Framing, CRC error detection, Stop-and-Wait, and Go-Back-N ARQ',
          'Ethernet CSMA/CD, MAC addressing, and Layer-2 switching',
        ],
      },
      {
        title: 'Network Layer & IP Subnetting',
        topics: [
          'IPv4 header, CIDR subnetting, VLSM, NAT, and ARP/ICMP',
          'Distance-vector (RIP) vs link-state (OSPF) routing algorithms',
          'IPv6 addressing fundamentals and congestion control principles',
        ],
      },
      {
        title: 'Transport & Application Layer Protocols',
        topics: [
          'TCP 3-way handshake, flow control, AIMD congestion control vs UDP',
          'DNS hierarchy, HTTP/1.1 vs HTTP/2, SMTP, and DHCP',
          'TLS handshake fundamentals and firewall packet filtering',
        ],
      },
    ],
  },

  // ===== B.COM HONS (3 Subjects across Sem 1, 2, 3) =====
  {
    code: 'BCOM101',
    name: 'Financial Accounting & Ind-AS Reporting',
    universityId: 'uni-du',
    courseId: 'course-bcom',
    branchIds: ['br-bcom-acc'],
    semester: 1,
    credits: 4,
    category: 'Core',
    summary: 'Conceptual accounting framework, Ind-AS standards, business income, consignment, branches, and partnership accounts.',
    keyFormulaHint: 'Sacrificing Ratio = `Old Share − New Share`; Gaining Ratio = `New Share − Old Share`.',
    units: [
      {
        title: 'Theoretical Framework & Ind-AS Standards',
        topics: [
          'Qualitative characteristics of financial statements and Ind-AS convergence',
          'Revenue recognition (Ind-AS 115) and inventory measurement (Ind-AS 2)',
          'Property, Plant & Equipment (Ind-AS 16) and depreciation accounting',
        ],
      },
      {
        title: 'Final Accounts & Non-Profit Organisations',
        topics: [
          'Manufacturing, Trading, Profit & Loss, and Balance Sheet adjustments',
          'Receipts & Payments vs Income & Expenditure accounts for NPOs',
          'Subscription adjustments and fund-based accounting',
        ],
      },
      {
        title: 'Hire Purchase & Installment Systems',
        topics: [
          'Cash price vs hire-purchase price and interest calculation methods',
          'Accounting entries in books of buyer and vendor',
          'Complete and partial repossession of assets on default',
        ],
      },
      {
        title: 'Branch & Departmental Accounting',
        topics: [
          'Dependent branches: Debtors system and Stock & Debtors system',
          'Independent branches and inter-branch reconciliation entries',
          'Departmental allocation of common expenses and unrealized profit',
        ],
      },
      {
        title: 'Partnership Accounts & Dissolution',
        topics: [
          'Goodwill valuation methods, admission, retirement, and death of partner',
          'Realisation account and settlement on firm dissolution',
          'Garner vs Murray rule and piecemeal distribution basics',
        ],
      },
    ],
  },
  {
    code: 'BCOM201',
    name: 'Corporate Law (Companies Act, 2013)',
    universityId: 'uni-du',
    courseId: 'course-bcom',
    branchIds: ['br-bcom-acc'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary: 'Company incorporation, MOA/AOA, share capital, directors & governance, meetings, and winding-up provisions.',
    keyFormulaHint: 'Ordinary Resolution (>50% votes) vs Special Resolution (≥75% votes cast).',
    units: [
      {
        title: 'Nature of Company & Incorporation',
        topics: [
          'Separate legal entity, limited liability, and lifting the corporate veil',
          'Private, Public, One Person Company (OPC), Small, and Section 8 companies',
          'SPICe+ incorporation steps, promoters duties, and pre-incorporation contracts',
        ],
      },
      {
        title: 'Memorandum, Articles & Prospectus',
        topics: [
          'Clauses of MOA, Doctrine of Ultra Vires, and alteration procedures',
          'AOA contents, Doctrine of Constructive Notice, and Indoor Management',
          'Red-herring, shelf prospectus, and civil/criminal misstatement liabilities',
        ],
      },
      {
        title: 'Share Capital & Debentures',
        topics: [
          'Equity vs preference shares, rights issue, bonus issue, and sweat equity',
          'Allotment, forfeiture, buy-back (Sec 68), and dematerialization',
          'Debenture trust deeds, charges registration, and dividend distribution rules',
        ],
      },
      {
        title: 'Company Management & Governance',
        topics: [
          'Board composition, independent & woman directors, DIN, and fiduciary duties',
          'Key Managerial Personnel (CEO, CFO, CS) and Audit Committee role',
          'Corporate Social Responsibility (Sec 135) thresholds and compliance',
        ],
      },
      {
        title: 'Meetings, Majority Rule & Winding Up',
        topics: [
          'AGM, EGM, notice periods, quorum, proxies, and e-voting rules',
          'Foss vs Harbottle rule and prevention of oppression & mismanagement',
          'NCLT tribunal winding-up grounds and Insolvency & Bankruptcy Code overview',
        ],
      },
    ],
  },
  {
    code: 'BCOM301',
    name: 'Income Tax Law & Practice',
    universityId: 'uni-du',
    courseId: 'course-bcom',
    branchIds: ['br-bcom-acc'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'Residential status, five heads of income, Chapter VI-A deductions, clubbing/set-off, and individual tax computation.',
    keyFormulaHint: 'Gross Total Income = Sum of 5 Heads + Clubbing − Set-Off; Total Income = GTI − Deductions.',
    units: [
      {
        title: 'Basic Concepts & Residential Status',
        topics: [
          'Assessee, assessment year, previous year, and heads of income overview',
          'Residential status of individuals (ROR, RNOR, NR) and incidence of tax',
          'Agricultural income and key exempt incomes under Section 10',
        ],
      },
      {
        title: 'Income from Salaries & House Property',
        topics: [
          'Salary allowances (HRA, gratuity, leave encashment), perquisites, and standard deduction',
          'Gross Annual Value (GAV), municipal taxes, and Section 24(a)/(b) deductions',
          'Self-occupied vs let-out property computation rules',
        ],
      },
      {
        title: 'Profits & Gains of Business or Profession (PGBP)',
        topics: [
          'Allowable business deductions, block-of-assets depreciation (Sec 32)',
          'Specific disallowances (Sec 40A, 43B) and presumptive taxation (44AD/44ADA)',
          'Computation of taxable business income from Profit & Loss account',
        ],
      },
      {
        title: 'Capital Gains & Income from Other Sources',
        topics: [
          'Short-term vs long-term capital assets, indexed cost of acquisition',
          'Capital gain exemptions (Sec 54, 54EC, 54F) and set-off rules',
          'Dividends, interest income, gifts taxation (Sec 56(2)(x)), and casual winnings',
        ],
      },
      {
        title: 'Deductions, Assessment & Tax Computation',
        topics: [
          'Chapter VI-A deductions (80C, 80CCD, 80D, 80E, 80G, 80TTA)',
          'Old Tax Regime vs New Tax Regime (Sec 115BAC) slab comparison',
          'TDS, advance tax due dates, PAN/ITR filing, and rebate under Sec 87A',
        ],
      },
    ],
  },

  // ===== DIPLOMA IN ENGINEERING / POLYTECHNIC (3 Subjects across Sem 3 & 4) =====
  {
    code: 'DIP301',
    name: 'Applied Mathematics III & Numerical Methods',
    universityId: 'board-bteup',
    courseId: 'course-diploma',
    branchIds: ['br-dip-cse', 'br-dip-me'],
    semester: 3,
    credits: 4,
    category: 'Basic Science',
    summary: 'Matrices, linear differential equations, Laplace transforms, Fourier series, and numerical root/integration methods.',
    keyFormulaHint: 'Newton-Raphson: `x_{n+1} = x_n − f(x_n)/f\'(x_n)`; Simpson 1/3: `(h/3)[y0 + yn + 4·odd + 2·even]`.',
    units: [
      {
        title: 'Matrices & Linear Systems',
        topics: [
          'Rank of a matrix, echelon form, and consistency of linear equations',
          'Eigenvalues, eigenvectors, and Cayley-Hamilton inverse calculation',
          'Engineering circuit and truss equilibrium applications',
        ],
      },
      {
        title: 'Ordinary Differential Equations',
        topics: [
          'Higher-order linear ODEs with constant coefficients (CF + PI)',
          'Cauchy-Euler homogeneous equations and simultaneous linear ODEs',
          'Mechanical vibration and RLC circuit modeling',
        ],
      },
      {
        title: 'Laplace Transforms',
        topics: [
          'Standard Laplace pairs, first shifting, and differentiation properties',
          'Inverse Laplace transforms via partial fractions and convolution',
          'Solving initial-value engineering ODEs with Laplace transforms',
        ],
      },
      {
        title: 'Fourier Series & Partial Derivatives',
        topics: [
          'Euler formulas, even/odd half-range sine and cosine expansions',
          'Partial derivatives, Euler theorem on homogeneous functions, and Jacobians',
          'Maxima and minima of two-variable functions',
        ],
      },
      {
        title: 'Numerical Methods for Engineers',
        topics: [
          'Bisection, Regula-Falsi, and Newton-Raphson root-finding algorithms',
          'Lagrange and Newton forward/backward interpolation',
          'Trapezoidal rule, Simpson 1/3 rule, and Runge-Kutta 4th-order ODE solver',
        ],
      },
    ],
  },
  {
    code: 'DIP302',
    name: 'Data Structures using C (Polytechnic)',
    universityId: 'board-bteup',
    courseId: 'course-diploma',
    branchIds: ['br-dip-cse'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary: 'Practical C implementations of arrays, stacks, queues, linked lists, binary trees, graphs, and sorting algorithms.',
    keyFormulaHint: 'Circular Queue Full: `(rear + 1) % MAX == front`; BST Inorder = sorted sequence.',
    units: [
      {
        title: 'Arrays, Complexity & Pointers in C',
        topics: [
          'Abstract Data Types (ADTs), time/space complexity basics',
          '1D/2D array traversal, insertion, deletion, and sparse matrix triples',
          'Struct pointers and dynamic node creation via malloc/free',
        ],
      },
      {
        title: 'Stacks & Queues',
        topics: [
          'Array and linked stack implementation (push, pop, peek)',
          'Infix-to-postfix conversion and postfix expression evaluation',
          'Linear queue, circular queue, deque, and priority queue applications',
        ],
      },
      {
        title: 'Linked Lists',
        topics: [
          'Singly linked list: insert/delete at beginning, middle, and end',
          'Doubly linked list and circular linked list traversal',
          'Polynomial representation and reversal algorithms',
        ],
      },
      {
        title: 'Trees & Graph Representations',
        topics: [
          'Binary Tree and Binary Search Tree (insert, search, delete)',
          'Preorder, Inorder, Postorder traversals and expression trees',
          'Adjacency matrix/list representation with BFS and DFS traversals',
        ],
      },
      {
        title: 'Searching & Sorting Techniques',
        topics: [
          'Linear search, Binary search, and simple hash table indexing',
          'Bubble, Selection, Insertion, Merge, and Quick Sort step traces',
          'Stability and practical complexity comparison table',
        ],
      },
    ],
  },
  {
    code: 'DIP401',
    name: 'Thermal Engineering & Fluid Mechanics',
    universityId: 'board-bteup',
    courseId: 'course-diploma',
    branchIds: ['br-dip-me'],
    semester: 4,
    credits: 4,
    category: 'Engineering Science',
    summary: 'Laws of thermodynamics, steam properties, IC engine cycles, fluid statics, Bernoulli equation, and hydraulic machines.',
    keyFormulaHint: 'Carnot Efficiency: `η = 1 − T_L / T_H`; Bernoulli: `P/ρg + v²/2g + z = constant`.',
    units: [
      {
        title: 'Laws of Thermodynamics & Ideal Gases',
        topics: [
          'Thermodynamic systems, properties, zeroth and first law (SFEE)',
          'Isobaric, isochoric, isothermal, adiabatic, and polytropic processes',
          'Second law (Kelvin-Planck & Clausius), Carnot cycle, and entropy',
        ],
      },
      {
        title: 'Properties of Steam & Boilers',
        topics: [
          'Sensible heat, latent heat, dryness fraction, and Mollier h-s chart',
          'Fire-tube vs water-tube boilers, mountings, and accessories',
          'Rankine cycle efficiency and condenser performance basics',
        ],
      },
      {
        title: 'Air-Standard Cycles & IC Engines',
        topics: [
          'Otto, Diesel, and Dual cycles on P-v and T-s diagrams',
          '4-stroke vs 2-stroke SI/CI engines, carburetion, and fuel injection',
          'Brake power, indicated power, mechanical & thermal efficiencies',
        ],
      },
      {
        title: 'Fluid Properties & Fluid Kinematics',
        topics: [
          'Viscosity (Newton law), surface tension, capillarity, and Pascal law',
          'Manometers, hydrostatic forces on submerged surfaces, and buoyancy',
          'Continuity equation and Bernoulli equation with Venturimeter/Orifice meter',
        ],
      },
      {
        title: 'Pipe Flow & Hydraulic Machines',
        topics: [
          'Laminar vs turbulent flow (Reynolds number) and Darcy-Weisbach head loss',
          'Pelton wheel, Francis, and Kaplan hydraulic turbines working principles',
          'Centrifugal vs reciprocating pumps, cavitation, and priming',
        ],
      },
    ],
  },
];

export const WIDE_SUBJECTS: Subject[] = RAW_WIDE_SUBJECTS.map((def) => {
  const slug = def.code.toLowerCase();
  return {
    id: `sub-${slug}`,
    code: def.code,
    name: def.name,
    universityId: def.universityId,
    courseId: def.courseId,
    branchIds: def.branchIds,
    semester: def.semester,
    credits: def.credits,
    category: def.category,
    summary: def.summary,
    units: def.units.map((u, uIdx) => ({
      id: `u-${slug}-${uIdx + 1}`,
      unitNumber: uIdx + 1,
      title: u.title,
      topics: u.topics.map((t, tIdx) => ({
        id: `t-${slug}-${uIdx + 1}-${tIdx + 1}`,
        title: t,
      })),
    })),
  };
});

export const WIDE_NOTES: StudyNote[] = RAW_WIDE_SUBJECTS.map((def) => {
  const slug = def.code.toLowerCase();
  const unitSections = def.units
    .map(
      (u, idx) =>
        `## Unit ${idx + 1}: ${u.title}\n\n${u.topics
          .map((t) => `- **${t.split(':')[0].trim()}**: ${t}. Focus on definitions, worked examples, and neat diagrams in exam answers.`)
          .join('\n')}`
    )
    .join('\n\n');

  const contentMarkdown = [
    `# ${def.code} — ${def.name} (Complete Exam Revision Guide)`,
    '',
    `> **Quick Formula / Core Framework:** ${def.keyFormulaHint}`,
    '',
    '## Exam Strategy Overview',
    `- **Syllabus Scope:** 5 structured units (${def.credits} Credits, Semester ${def.semester}).`,
    '- **High-Scoring Approach:** Start long answers with a clear definition or governing equation, include a clean block diagram / table comparison, and verify boundary conditions or units.',
    '',
    unitSections,
    '',
    '## Last-Minute Revision Checklist',
    ...def.units.map((u, idx) => `- [ ] Revise Unit ${idx + 1} key terms and solve 1 long question from **${u.title}**.`),
  ].join('\n');

  return {
    id: `note-${slug}-complete`,
    title: `${def.code} Complete Units 1–5 Revision Guide & Formula Sheet`,
    subjectCode: def.code,
    authorName: 'StudySphere Editorial Team',
    license: 'Original StudySphere',
    summary: `Original, exam-oriented study guide for ${def.name} covering all 5 units, core formulas/frameworks, and structured revision points.`,
    contentMarkdown,
    featured: def.code === 'BCA301' || def.code === 'KMBN201' || def.code === 'BP101T',
    publishedAt: '2026-11-23',
  };
});

export const WIDE_PYQS: PyqPaper[] = RAW_WIDE_SUBJECTS.map((def) => {
  const slug = def.code.toLowerCase();
  const session: PyqPaper['examSession'] =
    def.semester % 2 === 1 ? 'Odd Semester' : 'Even Semester';

  return {
    id: `pyq-${slug}-2025`,
    title: `${def.code} ${def.name} — 70-Mark Exam Practice Blueprint`,
    subjectCode: def.code,
    examYear: 2025,
    examSession: session,
    paperType: 'Original Practice Blueprint',
    authorNote: `Original 3-hour, 70-mark university exam blueprint mapped proportionally across all 5 units of ${def.code}.`,
    durationMinutes: 180,
    maxMarks: 70,
    featured: def.code === 'BCA101' || def.code === 'KCA201',
    publishedAt: '2026-11-23',
    sections: [
      {
        name: 'Section A — Short Conceptual Questions (7 × 2 = 14 Marks)',
        instruction: 'Attempt all seven questions briefly with clear definitions or formulas.',
        questions: [
          {
            number: 'Q1(a)',
            text: `Define the foundational concepts covered in ${def.units[0].title}.`,
            marks: 2,
            unitNumber: 1,
          },
          {
            number: 'Q1(b)',
            text: `State two key properties or principles related to ${def.units[0].topics[1] ?? def.units[0].title}.`,
            marks: 2,
            unitNumber: 1,
          },
          {
            number: 'Q1(c)',
            text: `Briefly explain: ${def.units[1].topics[0]}.`,
            marks: 2,
            unitNumber: 2,
          },
          {
            number: 'Q1(d)',
            text: `Differentiate between key approaches discussed in ${def.units[2].title}.`,
            marks: 2,
            unitNumber: 3,
          },
          {
            number: 'Q1(e)',
            text: `Write the governing rule or framework for ${def.units[2].topics[1] ?? def.units[2].title}.`,
            marks: 2,
            unitNumber: 3,
          },
          {
            number: 'Q1(f)',
            text: `Summarize the practical importance of ${def.units[3].topics[0]}.`,
            marks: 2,
            unitNumber: 4,
          },
          {
            number: 'Q1(g)',
            text: `Outline one standard real-world application of ${def.units[4].title}.`,
            marks: 2,
            unitNumber: 5,
          },
        ],
      },
      {
        name: 'Section B — Analytical & Applied Questions (Attempt any 3 × 7 = 21 Marks)',
        instruction: 'Attempt any three questions. Support your answer with diagrams, derivations, or worked steps.',
        questions: def.units.map((u, idx) => ({
          number: `Q2(${String.fromCharCode(97 + idx)})`,
          text: `Explain ${u.topics[0]} in detail, and illustrate how ${u.topics[1] ?? u.title} applies to problem solving in ${def.name}.`,
          marks: 7,
          unitNumber: idx + 1,
        })),
      },
      {
        name: 'Section C — Unit-Wise Long Questions (5 × 7 = 35 Marks)',
        instruction: 'Attempt one question from each unit (Units 1 to 5).',
        questions: def.units.map((u, idx) => ({
          number: `Q${idx + 3}`,
          text: `[Unit ${idx + 1}: ${u.title}] Critically analyze ${u.topics[2] ?? u.topics[0]} and compare its advantages, limitations, and implementation considerations.`,
          marks: 7,
          unitNumber: idx + 1,
        })),
      },
    ],
  };
});
