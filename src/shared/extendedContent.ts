import type { Branch, Course, PyqPaper, StudyNote, Subject } from './types';

/**
 * Extended multi-university courses, branches, AKTU branch-core subjects,
 * original study guides, and full Section A/B/C exam blueprints so every
 * indexed institution, branch, semester, and subject on StudySphere has
 * complete, original, copyright-safe academic content.
 */

export const EXTENDED_COURSES: Course[] = [
  {
    id: 'course-mu-be',
    slug: 'be-mumbai',
    universityId: 'uni-mumbai',
    name: 'Bachelor of Engineering',
    shortName: 'B.E.',
    degreeLevel: 'Undergraduate',
    durationYears: 4,
    totalSemesters: 8,
    description:
      'Four-year Mumbai University engineering degree (Rev-2019 C-Scheme) structured across foundational sciences, core computing systems, and applied labs.',
  },
  {
    id: 'course-anna-be',
    slug: 'be-anna',
    universityId: 'uni-anna',
    name: 'Bachelor of Engineering (R2021)',
    shortName: 'B.E. R2021',
    degreeLevel: 'Undergraduate',
    durationYears: 4,
    totalSemesters: 8,
    description:
      'Anna University Regulation 2021 undergraduate engineering programme featuring credit-weighted core courses, analytical foundations, and project tracks.',
  },
  {
    id: 'course-cbse-12',
    slug: 'cbse-senior-secondary',
    universityId: 'board-cbse',
    name: 'Senior Secondary (Class 11–12)',
    shortName: 'Class 12',
    degreeLevel: 'Secondary',
    durationYears: 2,
    totalSemesters: 2,
    description:
      'National CBSE Senior Secondary PCM & Computer Science curriculum aligned with board examination blueprints and engineering entrance fundamentals.',
  },
];

export const EXTENDED_BRANCHES: Branch[] = [
  {
    id: 'br-mu-comp',
    slug: 'mu-comp',
    courseId: 'course-mu-be',
    code: 'COMP',
    name: 'Computer Engineering (MU)',
    description:
      'Data structures, algorithm design, operating systems, computer networks, and distributed software engineering under Mumbai University.',
  },
  {
    id: 'br-mu-it',
    slug: 'mu-it',
    courseId: 'course-mu-be',
    code: 'IT-MU',
    name: 'Information Technology (MU)',
    description:
      'Data structures, algorithms, enterprise databases, web systems, and cloud engineering under Mumbai University Rev-2019.',
  },
  {
    id: 'br-anna-cse',
    slug: 'anna-cse',
    courseId: 'course-anna-be',
    code: 'CSE-AU',
    name: 'Computer Science & Engineering (AU)',
    description:
      'Anna University R2021 CSE core covering data structures, algorithms, operating systems, computer networks, and cloud architectures.',
  },
  {
    id: 'br-anna-ece',
    slug: 'anna-ece',
    courseId: 'course-anna-be',
    code: 'ECE-AU',
    name: 'Electronics & Communication (AU)',
    description:
      'Anna University R2021 ECE core covering electromagnetic fields, digital signal processing, networks, and embedded communication systems.',
  },
  {
    id: 'br-cbse-pcm',
    slug: 'cbse-pcm',
    courseId: 'course-cbse-12',
    code: 'PCM-CS',
    name: 'Science — PCM & Computer Science',
    description:
      'CBSE Class 12 Physics, Chemistry, Mathematics, and Python/SQL Computer Science aligned with board exams and engineering foundations.',
  },
  {
    id: 'br-cbse-pcb',
    slug: 'cbse-pcb',
    courseId: 'course-cbse-12',
    code: 'PCB',
    name: 'Science — Physics, Chemistry & Biology',
    description:
      'CBSE Class 12 Physics, Chemistry, and Biology structured for board examinations and life-science entrance preparation.',
  },
];

export const EXTENDED_SUBJECTS: Subject[] = [
  // AKTU B.Tech Branch Core Expansion (ECE, ME, CE, EE Semesters 4 & 5)
  {
    id: 'sub-bec401',
    code: 'BEC401',
    name: 'Digital System Design',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-ece', 'br-ee'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Combinational minimization, sequential state machines, VHDL hardware modeling, programmable logic arrays, and CMOS logic families.',
    units: [
      {
        id: 'u-bec401-1',
        unitNumber: 1,
        title: 'Logic Minimization & Combinational Synthesis',
        topics: [
          { id: 't-bec401-1-1', title: 'Quine-McCluskey tabular method and multi-variable K-maps' },
          { id: 't-bec401-1-2', title: 'Multiplexers, decoders, priority encoders, and carry look-ahead adders' },
        ],
      },
      {
        id: 'u-bec401-2',
        unitNumber: 2,
        title: 'Synchronous Sequential Circuits',
        topics: [
          { id: 't-bec401-2-1', title: 'JK, D, and T flip-flop excitation tables and timing constraints' },
          { id: 't-bec401-2-2', title: 'Mealy/Moore FSM reduction, state assignment, and sequence detectors' },
        ],
      },
      {
        id: 'u-bec401-3',
        unitNumber: 3,
        title: 'Counters, Registers & Hazard-Free Design',
        topics: [
          { id: 't-bec401-3-1', title: 'Ripple vs synchronous counters, ring and Johnson counters' },
          { id: 't-bec401-3-2', title: 'Static/dynamic hazards and race-free asynchronous state assignment' },
        ],
      },
      {
        id: 'u-bec401-4',
        unitNumber: 4,
        title: 'Logic Families & Memory Devices',
        topics: [
          { id: 't-bec401-4-1', title: 'TTL and CMOS noise margins, fan-out, and propagation delay' },
          { id: 't-bec401-4-2', title: 'ROM, PLA, PAL, CPLD, and FPGA architecture blocks' },
        ],
      },
      {
        id: 'u-bec401-5',
        unitNumber: 5,
        title: 'HDL Modeling Fundamentals',
        topics: [
          { id: 't-bec401-5-1', title: 'Structural, dataflow, and behavioral VHDL/Verilog constructs' },
          { id: 't-bec401-5-2', title: 'Testbenches, synthesis constraints, and timing verification' },
        ],
      },
    ],
  },
  {
    id: 'sub-bme401',
    code: 'BME401',
    name: 'Fluid Mechanics and Fluid Machines',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-me', 'br-ce'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Fluid statics, kinematics, Euler and Bernoulli dynamics, laminar/turbulent pipe flow, boundary layer theory, and hydraulic turbines/pumps.',
    units: [
      {
        id: 'u-bme401-1',
        unitNumber: 1,
        title: 'Fluid Properties & Hydrostatics',
        topics: [
          { id: 't-bme401-1-1', title: 'Viscosity, surface tension, manometry, and hydrostatic forces' },
          { id: 't-bme401-1-2', title: 'Buoyancy, metacentric height, and stability of floating bodies' },
        ],
      },
      {
        id: 'u-bme401-2',
        unitNumber: 2,
        title: 'Fluid Kinematics & Conservation Equations',
        topics: [
          { id: 't-bme401-2-1', title: 'Continuity equation, velocity potential, and stream function' },
          { id: 't-bme401-2-2', title: 'Euler equation, Bernoulli theorem, venturimeter, and orifice meter' },
        ],
      },
      {
        id: 'u-bme401-3',
        unitNumber: 3,
        title: 'Viscous Flow & Pipe Networks',
        topics: [
          { id: 't-bme401-3-1', title: 'Hagen-Poiseuille laminar flow and Darcy-Weisbach friction loss' },
          { id: 't-bme401-3-2', title: 'Minor losses, hydraulic gradient line, and pipes in series/parallel' },
        ],
      },
      {
        id: 'u-bme401-4',
        unitNumber: 4,
        title: 'Boundary Layer & Dimensional Analysis',
        topics: [
          { id: 't-bme401-4-1', title: 'Boundary layer thickness, separation control, drag and lift forces' },
          { id: 't-bme401-4-2', title: 'Buckingham Pi theorem and Reynolds/Froude similitude' },
        ],
      },
      {
        id: 'u-bme401-5',
        unitNumber: 5,
        title: 'Hydraulic Turbines & Centrifugal Pumps',
        topics: [
          { id: 't-bme401-5-1', title: 'Pelton wheel, Francis, and Kaplan turbine velocity triangles' },
          { id: 't-bme401-5-2', title: 'Centrifugal pump NPSH, cavitation, and specific speed' },
        ],
      },
    ],
  },
  {
    id: 'sub-bce401',
    code: 'BCE401',
    name: 'Structural Analysis',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-ce'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Determinacy, strain energy methods, influence line diagrams, three-hinged arches, slope-deflection, and moment distribution analysis.',
    units: [
      {
        id: 'u-bce401-1',
        unitNumber: 1,
        title: 'Indeterminacy & Energy Principles',
        topics: [
          { id: 't-bce401-1-1', title: 'Static and kinematic indeterminacy of beams, trusses, and frames' },
          { id: 't-bce401-1-2', title: 'Castigliano theorems and unit load method for deflections' },
        ],
      },
      {
        id: 'u-bce401-2',
        unitNumber: 2,
        title: 'Rolling Loads & Influence Line Diagrams',
        topics: [
          { id: 't-bce401-2-1', title: 'Muller-Breslau principle and ILDs for shear and bending moment' },
          { id: 't-bce401-2-2', title: 'Absolute maximum bending moment under train of wheel loads' },
        ],
      },
      {
        id: 'u-bce401-3',
        unitNumber: 3,
        title: 'Arches & Suspension Cables',
        topics: [
          { id: 't-bce401-3-1', title: 'Three-hinged and two-hinged parabolic/circular arches' },
          { id: 't-bce401-3-2', title: 'Suspension cables with three-hinged stiffening girders' },
        ],
      },
      {
        id: 'u-bce401-4',
        unitNumber: 4,
        title: 'Slope-Deflection & Moment Distribution',
        topics: [
          { id: 't-bce401-4-1', title: 'Slope-deflection equations for continuous beams and sway frames' },
          { id: 't-bce401-4-2', title: 'Hardy Cross moment distribution with carry-over factors' },
        ],
      },
      {
        id: 'u-bce401-5',
        unitNumber: 5,
        title: 'Matrix Stiffness Introduction',
        topics: [
          { id: 't-bce401-5-1', title: 'Flexibility vs stiffness matrix formulation for beams and trusses' },
          { id: 't-bce401-5-2', title: 'Global stiffness assembly and boundary condition reduction' },
        ],
      },
    ],
  },
  {
    id: 'sub-bee401',
    code: 'BEE401',
    name: 'Electrical Machines I',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-ee'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Electromechanical energy conversion, DC generators and motors, commutation, three-phase transformer connections, and parallel operation.',
    units: [
      {
        id: 'u-bee401-1',
        unitNumber: 1,
        title: 'Electromechanical Energy Conversion',
        topics: [
          { id: 't-bee401-1-1', title: 'Magnetic field energy, co-energy, and singly/doubly excited systems' },
          { id: 't-bee401-1-2', title: 'Force and torque production in rotating magnetic circuits' },
        ],
      },
      {
        id: 'u-bee401-2',
        unitNumber: 2,
        title: 'DC Generators & Armature Reaction',
        topics: [
          { id: 't-bee401-2-1', title: 'Lap vs wave windings, EMF equation, and open-circuit characteristics' },
          { id: 't-bee401-2-2', title: 'Armature reaction, compensating windings, and commutation methods' },
        ],
      },
      {
        id: 'u-bee401-3',
        unitNumber: 3,
        title: 'DC Motors: Speed Control & Testing',
        topics: [
          { id: 't-bee401-3-1', title: 'Torque-speed characteristics of shunt, series, and compound motors' },
          { id: 't-bee401-3-2', title: 'Ward-Leonard speed control, Swinburne test, and Hopkinson test' },
        ],
      },
      {
        id: 'u-bee401-4',
        unitNumber: 4,
        title: 'Single-Phase & Auto-Transformers',
        topics: [
          { id: 't-bee401-4-1', title: 'OC/SC tests, all-day efficiency, and Sumpner back-to-back test' },
          { id: 't-bee401-4-2', title: 'Copper saving in auto-transformers and parallel load sharing' },
        ],
      },
      {
        id: 'u-bee401-5',
        unitNumber: 5,
        title: 'Three-Phase Transformer Connections',
        topics: [
          { id: 't-bee401-5-1', title: 'Vector groups (Yy0, Dd0, Yd1, Dy11) and harmonic suppression' },
          { id: 't-bee401-5-2', title: 'Scott connection, open-delta (V-V), and tap-changing mechanisms' },
        ],
      },
    ],
  },
  {
    id: 'sub-bec501',
    code: 'BEC501',
    name: 'Signals and Systems',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-ece', 'br-ee'],
    semester: 5,
    credits: 4,
    category: 'Core',
    summary:
      'Continuous and discrete-time LTI systems, convolution, Fourier series/transforms, Laplace ROC analysis, Z-transforms, and Nyquist sampling.',
    units: [
      {
        id: 'u-bec501-1',
        unitNumber: 1,
        title: 'Signal Classification & LTI Properties',
        topics: [
          { id: 't-bec501-1-1', title: 'Energy/power signals, periodicity, causality, stability, and time-invariance' },
          { id: 't-bec501-1-2', title: 'Convolution integral/sum and impulse response characterization' },
        ],
      },
      {
        id: 'u-bec501-2',
        unitNumber: 2,
        title: 'Fourier Series & Fourier Transform',
        topics: [
          { id: 't-bec501-2-1', title: 'Dirichlet conditions, Parseval energy theorem, and frequency spectra' },
          { id: 't-bec501-2-2', title: 'Modulation, convolution duality, and ideal low-pass filter response' },
        ],
      },
      {
        id: 'u-bec501-3',
        unitNumber: 3,
        title: 'Laplace Transform & System Stability',
        topics: [
          { id: 't-bec501-3-1', title: 'Bilateral/unilateral Laplace ROC properties and pole-zero plots' },
          { id: 't-bec501-3-2', title: 'Initial/final value theorems and BIBO stability criteria' },
        ],
      },
      {
        id: 'u-bec501-4',
        unitNumber: 4,
        title: 'Sampling Theorem & Reconstruction',
        topics: [
          { id: 't-bec501-4-1', title: 'Nyquist rate, aliasing distortion, and anti-aliasing filters' },
          { id: 't-bec501-4-2', title: 'Zero-order hold and sinc interpolation reconstruction' },
        ],
      },
      {
        id: 'u-bec501-5',
        unitNumber: 5,
        title: 'Z-Transform & Discrete-Time LTI Systems',
        topics: [
          { id: 't-bec501-5-1', title: 'Z-plane ROC, unit circle stability, and inverse Z-transform' },
          { id: 't-bec501-5-2', title: 'Difference equations and block diagram realization' },
        ],
      },
    ],
  },
  {
    id: 'sub-bme501',
    code: 'BME501',
    name: 'Heat and Mass Transfer',
    universityId: 'uni-aktu',
    courseId: 'course-aktu-btech',
    branchIds: ['br-me'],
    semester: 5,
    credits: 4,
    category: 'Core',
    summary:
      'Steady and transient conduction, extended fin surfaces, forced and natural convection correlations, thermal radiation, and LMTD/NTU heat exchangers.',
    units: [
      {
        id: 'u-bme501-1',
        unitNumber: 1,
        title: 'Steady-State Conduction',
        topics: [
          { id: 't-bme501-1-1', title: 'Fourier law, composite walls, critical radius of insulation' },
          { id: 't-bme501-1-2', title: 'Internal heat generation in plane walls, cylinders, and spheres' },
        ],
      },
      {
        id: 'u-bme501-2',
        unitNumber: 2,
        title: 'Fins & Transient Conduction',
        topics: [
          { id: 't-bme501-2-1', title: 'Fin efficiency, effectiveness, and infinitely long fin temperature profile' },
          { id: 't-bme501-2-2', title: 'Lumped capacitance analysis (Biot < 0.1) and Heisler charts' },
        ],
      },
      {
        id: 'u-bme501-3',
        unitNumber: 3,
        title: 'Forced & Natural Convection',
        topics: [
          { id: 't-bme501-3-1', title: 'Nusselt, Prandtl, Reynolds, and Grashof dimensionless numbers' },
          { id: 't-bme501-3-2', title: 'Dittus-Boelter pipe correlation and free convection over plates' },
        ],
      },
      {
        id: 'u-bme501-4',
        unitNumber: 4,
        title: 'Thermal Radiation Exchange',
        topics: [
          { id: 't-bme501-4-1', title: 'Stefan-Boltzmann law, Wien displacement, and Kirchhoff law' },
          { id: 't-bme501-4-2', title: 'Shape factor algebra, radiation shields, and electrical network analogy' },
        ],
      },
      {
        id: 'u-bme501-5',
        unitNumber: 5,
        title: 'Heat Exchangers & Mass Transfer',
        topics: [
          { id: 't-bme501-5-1', title: 'Parallel vs counter-flow LMTD and effectiveness-NTU design' },
          { id: 't-bme501-5-2', title: 'Fick law of diffusion and equimolar counter-diffusion' },
        ],
      },
    ],
  },
  // Mumbai University Subjects
  {
    id: 'sub-mu-csc302',
    code: 'CSC302',
    name: 'Data Structures (MU Rev-2019)',
    universityId: 'uni-mumbai',
    courseId: 'course-mu-be',
    branchIds: ['br-mu-comp', 'br-mu-it'],
    semester: 3,
    credits: 4,
    category: 'Core',
    summary:
      'Mumbai University B.E. Data Structures covering ADTs, stacks, queues, linked lists, trees, graphs, and hashing.',
    units: [
      {
        id: 'u-mu-csc302-1',
        unitNumber: 1,
        title: 'Introduction to ADTs, Stacks & Queues',
        topics: [
          { id: 't-mu-csc302-1-1', title: 'Abstract data types, postfix evaluation, and parenthesis matching' },
          { id: 't-mu-csc302-1-2', title: 'Circular queues, double-ended queues, and priority queues' },
        ],
      },
      {
        id: 'u-mu-csc302-2',
        unitNumber: 2,
        title: 'Linked Lists & Dynamic Representations',
        topics: [
          { id: 't-mu-csc302-2-1', title: 'Singly, doubly, and circular linked list insertion/deletion' },
          { id: 't-mu-csc302-2-2', title: 'Polynomial arithmetic and linked stack/queue implementations' },
        ],
      },
      {
        id: 'u-mu-csc302-3',
        unitNumber: 3,
        title: 'Trees, AVL, B-Trees & Tries',
        topics: [
          { id: 't-mu-csc302-3-1', title: 'Binary search trees, expression trees, and AVL rotations' },
          { id: 't-mu-csc302-3-2', title: 'Multi-way B-Trees, B+ Trees, and prefix Tries' },
        ],
      },
      {
        id: 'u-mu-csc302-4',
        unitNumber: 4,
        title: 'Graphs, Traversals & Hashing',
        topics: [
          { id: 't-mu-csc302-4-1', title: 'BFS, DFS, topological sort, and topological dependencies' },
          { id: 't-mu-csc302-4-2', title: 'Hash functions, separate chaining, and quadratic probing' },
        ],
      },
    ],
  },
  {
    id: 'sub-mu-csc401',
    code: 'CSC401',
    name: 'Analysis of Algorithms (MU)',
    universityId: 'uni-mumbai',
    courseId: 'course-mu-be',
    branchIds: ['br-mu-comp', 'br-mu-it'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Asymptotic recurrences, divide and conquer, greedy heuristics, dynamic programming, backtracking, and string matching algorithms.',
    units: [
      {
        id: 'u-mu-csc401-1',
        unitNumber: 1,
        title: 'Recurrences & Divide and Conquer',
        topics: [
          { id: 't-mu-csc401-1-1', title: 'Master theorem, recursion trees, and Strassen multiplication' },
          { id: 't-mu-csc401-1-2', title: 'Quick sort average-case analysis and Min-Max finding' },
        ],
      },
      {
        id: 'u-mu-csc401-2',
        unitNumber: 2,
        title: 'Greedy & Dynamic Programming',
        topics: [
          { id: 't-mu-csc401-2-1', title: 'Job sequencing with deadlines, Prim/Kruskal MST, and Huffman coding' },
          { id: 't-mu-csc401-2-2', title: '0/1 Knapsack, All-Pairs Shortest Path, and LCS' },
        ],
      },
      {
        id: 'u-mu-csc401-3',
        unitNumber: 3,
        title: 'Backtracking, Branch & Bound, and String Matching',
        topics: [
          { id: 't-mu-csc401-3-1', title: 'Sum of subsets, N-Queens, and 15-puzzle branch-and-bound' },
          { id: 't-mu-csc401-3-2', title: 'Rabin-Karp and Knuth-Morris-Pratt (KMP) prefix function' },
        ],
      },
    ],
  },
  {
    id: 'sub-mu-csc501',
    code: 'CSC501',
    name: 'Operating Systems & Computer Networks (MU)',
    universityId: 'uni-mumbai',
    courseId: 'course-mu-be',
    branchIds: ['br-mu-comp', 'br-mu-it'],
    semester: 5,
    credits: 4,
    category: 'Core',
    summary:
      'Process scheduling, synchronization, deadlocks, virtual memory paging, TCP/IP layered protocols, and routing algorithms under MU Rev-2019.',
    units: [
      {
        id: 'u-mu-csc501-1',
        unitNumber: 1,
        title: 'Processes, CPU Scheduling & Synchronization',
        topics: [
          { id: 't-mu-csc501-1-1', title: 'Preemptive SRTF, Round Robin, and multilevel feedback queues' },
          { id: 't-mu-csc501-1-2', title: 'Semaphores, monitors, and Banker deadlock avoidance' },
        ],
      },
      {
        id: 'u-mu-csc501-2',
        unitNumber: 2,
        title: 'Virtual Memory & File Systems',
        topics: [
          { id: 't-mu-csc501-2-1', title: 'Demand paging, LRU/Optimal page replacement, and thrashing' },
          { id: 't-mu-csc501-2-2', title: 'Inode directory allocation and SCAN/C-SCAN disk scheduling' },
        ],
      },
      {
        id: 'u-mu-csc501-3',
        unitNumber: 3,
        title: 'TCP/IP Networking & Routing',
        topics: [
          { id: 't-mu-csc501-3-1', title: 'CIDR subnetting, OSPF link-state routing, and BGP basics' },
          { id: 't-mu-csc501-3-2', title: 'TCP three-way handshake, congestion control, and DNS/HTTP' },
        ],
      },
    ],
  },
  {
    id: 'sub-mu-itc601',
    code: 'ITC601',
    name: 'Database & Distributed Web Engineering (MU)',
    universityId: 'uni-mumbai',
    courseId: 'course-mu-be',
    branchIds: ['br-mu-it', 'br-mu-comp'],
    semester: 6,
    credits: 4,
    category: 'Core',
    summary:
      'Relational normalization, ACID transactions, indexing, REST API architecture, distributed replication, and web security fundamentals.',
    units: [
      {
        id: 'u-mu-itc601-1',
        unitNumber: 1,
        title: 'Relational Design & Query Optimization',
        topics: [
          { id: 't-mu-itc601-1-1', title: 'BCNF/3NF lossless join decomposition and functional dependencies' },
          { id: 't-mu-itc601-1-2', title: 'B+ Tree indexing, query execution plans, and join cost estimation' },
        ],
      },
      {
        id: 'u-mu-itc601-2',
        unitNumber: 2,
        title: 'Transactions, Concurrency & Recovery',
        topics: [
          { id: 't-mu-itc601-2-1', title: 'Conflict serializability, strict 2PL, and MVCC isolation levels' },
          { id: 't-mu-itc601-2-2', title: 'Write-ahead logging (WAL), checkpoints, and ARIES crash recovery' },
        ],
      },
      {
        id: 'u-mu-itc601-3',
        unitNumber: 3,
        title: 'Distributed Services & Web Architecture',
        topics: [
          { id: 't-mu-itc601-3-1', title: 'RESTful stateless services, caching headers, and load balancing' },
          { id: 't-mu-itc601-3-2', title: 'CAP theorem trade-offs, OWASP security, and horizontal sharding' },
        ],
      },
    ],
  },
  // Anna University Subjects
  {
    id: 'sub-au-cs3301',
    code: 'CS3301',
    name: 'Data Structures (Anna Univ. R2021)',
    universityId: 'uni-anna',
    courseId: 'course-anna-be',
    branchIds: ['br-anna-cse', 'br-anna-ece'],
    semester: 3,
    credits: 3,
    category: 'Core',
    summary:
      'Anna University Regulation 2021 core Data Structures covering lists, stacks, queues, trees, heaps, graphs, sorting, and hashing.',
    units: [
      {
        id: 'u-au-cs3301-1',
        unitNumber: 1,
        title: 'Lists, Stacks & Queues',
        topics: [
          { id: 't-au-cs3301-1-1', title: 'List ADT, array vs linked list trade-offs, and polynomial addition' },
          { id: 't-au-cs3301-1-2', title: 'Stack expression conversion and circular queue scheduling' },
        ],
      },
      {
        id: 'u-au-cs3301-2',
        unitNumber: 2,
        title: 'Trees & Priority Queues',
        topics: [
          { id: 't-au-cs3301-2-1', title: 'Binary search trees, AVL rotations, and B-Tree balancing' },
          { id: 't-au-cs3301-2-2', title: 'Binary heaps, percolate up/down, and priority queue operations' },
        ],
      },
      {
        id: 'u-au-cs3301-3',
        unitNumber: 3,
        title: 'Graphs, Sorting & Hashing',
        topics: [
          { id: 't-au-cs3301-3-1', title: 'Topological sort, Dijkstra shortest paths, and Prim/Kruskal MST' },
          { id: 't-au-cs3301-3-2', title: 'Merge sort, radix sort, separate chaining, and rehashing' },
        ],
      },
    ],
  },
  {
    id: 'sub-au-cs3401',
    code: 'CS3401',
    name: 'Algorithms & Operating Systems (Anna Univ. R2021)',
    universityId: 'uni-anna',
    courseId: 'course-anna-be',
    branchIds: ['br-anna-cse'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Algorithmic analysis, dynamic programming, NP-completeness, CPU scheduling, memory management, and POSIX concurrency under R2021.',
    units: [
      {
        id: 'u-au-cs3401-1',
        unitNumber: 1,
        title: 'Algorithm Analysis & Graph Optimization',
        topics: [
          { id: 't-au-cs3401-1-1', title: 'Asymptotic bounds, Floyd-Warshall, and Bellman-Ford shortest paths' },
          { id: 't-au-cs3401-1-2', title: 'Ford-Fulkerson maximum flow and bipartite matching' },
        ],
      },
      {
        id: 'u-au-cs3401-2',
        unitNumber: 2,
        title: 'NP-Completeness & Approximation',
        topics: [
          { id: 't-au-cs3401-2-1', title: 'P, NP, NP-Complete polynomial reductions (SAT, Vertex Cover)' },
          { id: 't-au-cs3401-2-2', title: 'Backtracking, branch-and-bound, and 2-approximation heuristics' },
        ],
      },
      {
        id: 'u-au-cs3401-3',
        unitNumber: 3,
        title: 'OS Processes, Deadlocks & Paging',
        topics: [
          { id: 't-au-cs3401-3-1', title: 'Process states, mutex/semaphore synchronization, and Banker safety' },
          { id: 't-au-cs3401-3-2', title: 'Multi-level page tables, TLB hit ratio, and page replacement' },
        ],
      },
    ],
  },
  {
    id: 'sub-au-ec3452',
    code: 'EC3452',
    name: 'Electromagnetic Fields & Signal Processing (AU)',
    universityId: 'uni-anna',
    courseId: 'course-anna-be',
    branchIds: ['br-anna-ece'],
    semester: 4,
    credits: 4,
    category: 'Core',
    summary:
      'Maxwell equations, uniform plane waves, transmission line impedance matching, DFT/FFT algorithms, and FIR/IIR digital filter design.',
    units: [
      {
        id: 'u-au-ec3452-1',
        unitNumber: 1,
        title: 'Maxwell Equations & Plane Wave Propagation',
        topics: [
          { id: 't-au-ec3452-1-1', title: 'Gauss, Faraday, and Ampere-Maxwell differential/integral forms' },
          { id: 't-au-ec3452-1-2', title: 'Poynting vector, skin depth, and normal incidence reflection' },
        ],
      },
      {
        id: 'u-au-ec3452-2',
        unitNumber: 2,
        title: 'Transmission Lines & Smith Chart',
        topics: [
          { id: 't-au-ec3452-2-1', title: 'Characteristic impedance, VSWR, reflection coefficient, and quarter-wave matching' },
          { id: 't-au-ec3452-2-2', title: 'Single-stub matching using normalized Smith Chart trajectories' },
        ],
      },
      {
        id: 'u-au-ec3452-3',
        unitNumber: 3,
        title: 'DFT, Radix-2 FFT & Digital Filters',
        topics: [
          { id: 't-au-ec3452-3-1', title: 'Decimation-in-time (DIT) FFT butterfly structure and circular convolution' },
          { id: 't-au-ec3452-3-2', title: 'Butterworth IIR bilinear transformation and Hamming window FIR design' },
        ],
      },
    ],
  },
  {
    id: 'sub-au-cs3591',
    code: 'CS3591',
    name: 'Computer Networks & Cloud Architecture (AU)',
    universityId: 'uni-anna',
    courseId: 'course-anna-be',
    branchIds: ['br-anna-cse', 'br-anna-ece'],
    semester: 5,
    credits: 4,
    category: 'Core',
    summary:
      'OSI/TCP-IP layers, Ethernet switching, IPv4/IPv6 routing, TCP congestion control, TLS security, and virtualization cloud models.',
    units: [
      {
        id: 'u-au-cs3591-1',
        unitNumber: 1,
        title: 'Data Link Layer & Medium Access',
        topics: [
          { id: 't-au-cs3591-1-1', title: 'CRC error detection, Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ' },
          { id: 't-au-cs3591-1-2', title: 'CSMA/CD Ethernet frames, VLAN tagging, and spanning tree protocol' },
        ],
      },
      {
        id: 'u-au-cs3591-2',
        unitNumber: 2,
        title: 'Network Routing & Transport Reliability',
        topics: [
          { id: 't-au-cs3591-2-1', title: 'Distance-vector (RIP), Link-state (OSPF), and CIDR aggregation' },
          { id: 't-au-cs3591-2-2', title: 'TCP slow start, AIMD congestion avoidance, and UDP datagrams' },
        ],
      },
      {
        id: 'u-au-cs3591-3',
        unitNumber: 3,
        title: 'Application Protocols & Cloud Virtualization',
        topics: [
          { id: 't-au-cs3591-3-1', title: 'DNS hierarchy, HTTP/2 multiplexing, SMTP, and TLS handshake' },
          { id: 't-au-cs3591-3-2', title: 'Hypervisors, container orchestration, and IaaS/PaaS/SaaS service layers' },
        ],
      },
    ],
  },
  // CBSE Class 12 Subjects (Equal Multi-Stream, Multi-Term Coverage)
  {
    id: 'sub-cbse-phy12',
    code: 'CBSE-P12',
    name: 'Physics Class 12 (Board Core)',
    universityId: 'board-cbse',
    courseId: 'course-cbse-12',
    branchIds: ['br-cbse-pcm', 'br-cbse-pcb'],
    semester: 1,
    credits: 5,
    category: 'Basic Science',
    summary:
      'Electrostatics, current electricity, moving charges and magnetism, electromagnetic induction, ray/wave optics, and semiconductor devices.',
    units: [
      {
        id: 'u-cbse-p12-1',
        unitNumber: 1,
        title: 'Electrostatics & Current Electricity',
        topics: [
          { id: 't-cbse-p12-1-1', title: 'Gauss Law applications, electric potential, and parallel-plate capacitors' },
          { id: 't-cbse-p12-1-2', title: 'Drift velocity, Kirchhoff rules, Wheatstone bridge, and meter bridge' },
        ],
      },
      {
        id: 'u-cbse-p12-2',
        unitNumber: 2,
        title: 'Magnetism, EMI & Alternating Current',
        topics: [
          { id: 't-cbse-p12-2-1', title: 'Biot-Savart Law, Ampere circuital law, and moving-coil galvanometer' },
          { id: 't-cbse-p12-2-2', title: 'Faraday-Lenz laws, series LCR resonance, and step-up/down transformers' },
        ],
      },
      {
        id: 'u-cbse-p12-3',
        unitNumber: 3,
        title: 'Optics, Modern Physics & Semiconductors',
        topics: [
          { id: 't-cbse-p12-3-1', title: 'Lens maker formula, Young double-slit interference, and single-slit diffraction' },
          { id: 't-cbse-p12-3-2', title: 'Photoelectric effect, Bohr hydrogen spectrum, and p-n junction rectifiers' },
        ],
      },
    ],
  },
  {
    id: 'sub-cbse-chem12',
    code: 'CBSE-C12',
    name: 'Chemistry Class 12 (Board Core)',
    universityId: 'board-cbse',
    courseId: 'course-cbse-12',
    branchIds: ['br-cbse-pcm', 'br-cbse-pcb'],
    semester: 1,
    credits: 5,
    category: 'Basic Science',
    summary:
      'Colligative solutions, Nernst electrochemistry, chemical kinetics, d/f-block coordination compounds, organic carbonyls, and biomolecules.',
    units: [
      {
        id: 'u-cbse-c12-1',
        unitNumber: 1,
        title: 'Solutions, Electrochemistry & Kinetics',
        topics: [
          { id: 't-cbse-c12-1-1', title: 'Raoult Law, van t Hoff factor, osmotic pressure, and Nernst equation' },
          { id: 't-cbse-c12-1-2', title: 'First-order rate constant, half-life, and Arrhenius activation energy' },
        ],
      },
      {
        id: 'u-cbse-c12-2',
        unitNumber: 2,
        title: 'd/f-Block Elements & Coordination Chemistry',
        topics: [
          { id: 't-cbse-c12-2-1', title: 'Lanthanoid contraction, variable oxidation states, and catalytic trends' },
          { id: 't-cbse-c12-2-2', title: 'IUPAC coordination nomenclature, Werner theory, and Crystal Field Theory (CFT)' },
        ],
      },
      {
        id: 'u-cbse-c12-3',
        unitNumber: 3,
        title: 'Organic Mechanisms & Biomolecules',
        topics: [
          { id: 't-cbse-c12-3-1', title: 'SN1/SN2 haloalkanes, Aldol/Cannizzaro reactions, and Gabriel phthalimide synthesis' },
          { id: 't-cbse-c12-3-2', title: 'Glucose cyclic structure, peptide bonds, DNA/RNA bases, and vitamins' },
        ],
      },
    ],
  },
  {
    id: 'sub-cbse-math12',
    code: 'CBSE-M12',
    name: 'Mathematics Class 12 (PCM Core)',
    universityId: 'board-cbse',
    courseId: 'course-cbse-12',
    branchIds: ['br-cbse-pcm'],
    semester: 2,
    credits: 5,
    category: 'Basic Science',
    summary:
      'Relations and functions, matrices and determinants, differential and integral calculus, vectors, 3D geometry, linear programming, and Bayes probability.',
    units: [
      {
        id: 'u-cbse-m12-1',
        unitNumber: 1,
        title: 'Relations, Functions & Inverse Trigonometry',
        topics: [
          { id: 't-cbse-m12-1-1', title: 'Equivalence relations, bijective functions, and principal value branches' },
        ],
      },
      {
        id: 'u-cbse-m12-2',
        unitNumber: 2,
        title: 'Matrices, Determinants & Calculus',
        topics: [
          { id: 't-cbse-m12-2-1', title: 'Matrix inverse via adjoint, continuity, differentiability, and definite integrals' },
          { id: 't-cbse-m12-2-2', title: 'Differential equations (variable separable, homogeneous, linear)' },
        ],
      },
      {
        id: 'u-cbse-m12-3',
        unitNumber: 3,
        title: 'Vectors, 3D Geometry & Probability',
        topics: [
          { id: 't-cbse-m12-3-1', title: 'Dot/cross products, shortest distance between skew lines, and Bayes theorem' },
        ],
      },
    ],
  },
  {
    id: 'sub-cbse-cs12',
    code: 'CBSE-CS12',
    name: 'Computer Science Class 12 (Python & SQL)',
    universityId: 'board-cbse',
    courseId: 'course-cbse-12',
    branchIds: ['br-cbse-pcm'],
    semester: 2,
    credits: 4,
    category: 'Core',
    summary:
      'Python functions, file handling (text/binary/CSV), stack operations, relational SQL queries, database connectivity, and computer networking.',
    units: [
      {
        id: 'u-cbse-cs12-1',
        unitNumber: 1,
        title: 'Python Functions, Files & Stacks',
        topics: [
          { id: 't-cbse-cs12-1-1', title: 'Scope rules, exception handling, and reading/writing CSV and pickle files' },
          { id: 't-cbse-cs12-1-2', title: 'Implementing LIFO stack push/pop/peek operations using Python lists' },
        ],
      },
      {
        id: 'u-cbse-cs12-2',
        unitNumber: 2,
        title: 'Relational Databases & SQL',
        topics: [
          { id: 't-cbse-cs12-2-1', title: 'Primary/foreign keys, SELECT/WHERE/GROUP BY/HAVING, and equijoins' },
          { id: 't-cbse-cs12-2-2', title: 'Python-MySQL cursor connectivity with parameterized queries' },
        ],
      },
      {
        id: 'u-cbse-cs12-3',
        unitNumber: 3,
        title: 'Computer Networks & Cyber Protocols',
        topics: [
          { id: 't-cbse-cs12-3-1', title: 'PAN/LAN/MAN/WAN topologies, optical fiber vs wireless media, and switches' },
          { id: 't-cbse-cs12-3-2', title: 'HTTP/HTTPS, TCP/IP, VoIP, DNS resolution, and web security essentials' },
        ],
      },
    ],
  },
  {
    id: 'sub-cbse-bio12',
    code: 'CBSE-B12',
    name: 'Biology Class 12 (PCB Core)',
    universityId: 'board-cbse',
    courseId: 'course-cbse-12',
    branchIds: ['br-cbse-pcb'],
    semester: 2,
    credits: 5,
    category: 'Basic Science',
    summary:
      'Reproduction in organisms, Mendelian and molecular genetics, recombinant DNA biotechnology, human immunity, and ecosystem ecology.',
    units: [
      {
        id: 'u-cbse-b12-1',
        unitNumber: 1,
        title: 'Reproduction & Genetics',
        topics: [
          { id: 't-cbse-b12-1-1', title: 'Double fertilization in angiosperms, gametogenesis, and Mendel laws' },
          { id: 't-cbse-b12-1-2', title: 'DNA replication, transcription, lac operon regulation, and pedigree analysis' },
        ],
      },
      {
        id: 'u-cbse-b12-2',
        unitNumber: 2,
        title: 'Human Health & Biotechnology',
        topics: [
          { id: 't-cbse-b12-2-1', title: 'Innate vs adaptive immunity, antibodies, vaccination, and pathogen life cycles' },
          { id: 't-cbse-b12-2-2', title: 'Restriction enzymes, PCR amplification, plasmid vectors, and Bt crops' },
        ],
      },
      {
        id: 'u-cbse-b12-3',
        unitNumber: 3,
        title: 'Ecology & Biodiversity Conservation',
        topics: [
          { id: 't-cbse-b12-3-1', title: 'Logistic population growth, ecological pyramids, and energy flow' },
          { id: 't-cbse-b12-3-2', title: 'Species-area relationship, hotspots, in-situ and ex-situ conservation' },
        ],
      },
    ],
  },
];

export const EXTENDED_NOTES: StudyNote[] = [
  {
    id: 'note-bec401-u2',
    subjectCode: 'BEC401',
    unitNumber: 2,
    title: 'Unit 2 Study Guide: Synchronous FSMs, Mealy vs Moore & Sequence Detectors',
    summary: 'Flip-flop excitation tables, state reduction via implication charts, and step-by-step overlapping 1011 sequence detector synthesis.',
    authorName: 'StudySphere Electronics Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Synchronous Sequential Circuits & FSM Design

## 1. Mealy vs Moore State Machines
- Moore Machine: Output depends strictly on the present state; glitch-free after clock edge, usually requires one extra state.
- Mealy Machine: Output depends on present state and current input; reacts within the same clock cycle.

## 2. Flip-Flop Excitation Quick Reference
- D Flip-Flop: D = Q(next).
- T Flip-Flop: T = Q XOR Q(next).
- JK Flip-Flop: 0→0 (J=0, K=X), 0→1 (J=1, K=X), 1→0 (J=X, K=1), 1→1 (J=X, K=0).

## 3. Sequence Detector Synthesis Checklist
1. Draw state diagram and check whether overlapping sequences are allowed.
2. Minimize equivalent states using a partition or implication table.
3. Assign binary codes, derive K-maps for flip-flop inputs, and check unused self-starting states.`,
  },
  {
    id: 'note-bme401-u2',
    subjectCode: 'BME401',
    unitNumber: 2,
    title: 'Unit 2 & 3 Study Guide: Bernoulli Theorem, Pipe Friction & Flow Meters',
    summary: 'Continuity, Euler derivation to Bernoulli head equation, Darcy-Weisbach head loss, and venturimeter discharge calculations.',
    authorName: 'StudySphere Mechanical Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Fluid Dynamics & Viscous Pipe Flow

## 1. Bernoulli Energy Equation
- Along a streamline for steady, incompressible, inviscid flow: P/(rho*g) + V^2/(2g) + z = constant.
- Pressure head + kinetic head + datum head remains conserved across sections when head loss hf = 0.

## 2. Pipe Flow Losses
- Darcy-Weisbach Major Loss: hf = (f * L * V^2) / (2 * g * D).
- Laminar Flow (Re < 2000): friction factor f = 64 / Re (Hagen-Poiseuille parabolic velocity profile).
- Sudden Expansion Minor Loss: h_exp = (V1 - V2)^2 / (2g).`,
  },
  {
    id: 'note-bce401-u4',
    subjectCode: 'BCE401',
    unitNumber: 4,
    title: 'Unit 4 Study Guide: Slope-Deflection & Moment Distribution Method',
    summary: 'Fixed-end moment signs, stiffness and distribution factors, carry-over rules, and continuous beam analysis steps.',
    authorName: 'StudySphere Civil Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Indeterminate Beam Analysis

## 1. Slope-Deflection Equations
- M_AB = FEM_AB + (2EI / L) * (2*theta_A + theta_B - 3*delta/L).
- Clockwise end moments and rotations are taken positive consistently across every span.

## 2. Hardy Cross Moment Distribution Rules
- Far end fixed: relative stiffness k = 4EI / L, carry-over factor COF = +1/2.
- Far end hinged/roller: modified stiffness k = 3EI / L, carry-over factor COF = 0.
- Distribution Factor DF_i = k_i / sum(k_j) at each joint; sum of DFs at every internal joint equals 1.`,
  },
  {
    id: 'note-bee401-u3',
    subjectCode: 'BEE401',
    unitNumber: 3,
    title: 'Unit 3 & 5 Study Guide: DC Motor Speed Control & Three-Phase Transformer Groups',
    summary: 'Back EMF torque relations, flux vs armature speed control, and Yd1/Dy11 three-phase transformer phasor conventions.',
    authorName: 'StudySphere Electrical Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# DC Motors & Three-Phase Transformers

## 1. DC Motor Governing Equations
- Back EMF: Eb = V - Ia * Ra, and Speed N proportional to (V - Ia * Ra) / phi.
- Armature voltage control (Ward-Leonard): smooth speed below base speed with constant torque.
- Field flux weakening: speed above base speed with constant power.

## 2. Three-Phase Vector Groups
- Clock-hour convention: HV line phasor sits at 12 o'clock; LV phasor position indicates phase lag in multiples of 30 degrees.
- Dy11 (Delta HV, Star LV): LV lags HV by 330 deg (leads by 30 deg); common in distribution transformers.`,
  },
  {
    id: 'note-bec501-u3',
    subjectCode: 'BEC501',
    unitNumber: 3,
    title: 'Unit 3 & 5 Study Guide: Laplace ROC, Sampling Theorem & Z-Transform Stability',
    summary: 'Region of convergence rules for causal/stable LTI systems, Nyquist anti-aliasing, and unit-circle pole locations.',
    authorName: 'StudySphere Electronics Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Laplace, Sampling & Z-Transform Essentials

## 1. Laplace ROC & BIBO Stability
- Causal right-sided signal: ROC lies to the right of the rightmost pole (Re(s) > sigma_max).
- System is BIBO stable if and only if the j*omega imaginary axis lies inside the ROC.

## 2. Nyquist Sampling & Z-Transform
- Sampling frequency fs >= 2 * f_max prevents spectral overlap (aliasing).
- Discrete-time causal LTI system is BIBO stable if and only if all poles lie strictly inside the unit circle (|z| < 1).`,
  },
  {
    id: 'note-bme501-u1',
    subjectCode: 'BME501',
    unitNumber: 1,
    title: 'Unit 1 & 5 Study Guide: Composite Conduction, Critical Insulation & LMTD Exchangers',
    summary: 'Thermal resistance networks, critical radius of cylinder/sphere insulation, and parallel vs counter-flow heat exchanger efficiency.',
    authorName: 'StudySphere Mechanical Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Conduction & Heat Exchanger Analysis

## 1. Critical Radius of Insulation
- Cylinder: r_c = k / h. Adding insulation increases heat transfer until r reaches r_c, then reduces it.
- Sphere: r_c = 2k / h.

## 2. LMTD & NTU Method
- Q = U * A * LMTD where LMTD = (dT1 - dT2) / ln(dT1 / dT2).
- Counter-flow heat exchangers always yield higher LMTD than parallel-flow for identical terminal temperatures.`,
  },
  {
    id: 'note-mu-csc302-u3',
    subjectCode: 'CSC302',
    unitNumber: 3,
    title: 'Module 3 Study Guide: AVL Trees, B-Trees & Prefix Tries (MU Rev-2019)',
    summary: 'Balance factor maintenance, four AVL rotations, B-Tree split rules, and Trie dictionary search complexity.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Balanced Trees & Tries (Mumbai University)

## 1. AVL Balance Maintenance
- Balance Factor BF(u) = height(left) - height(right) in {-1, 0, +1}.
- LL → single right rotation; RR → single left rotation; LR → left then right; RL → right then left.

## 2. Multi-Way B-Trees & Tries
- B-Tree of order m keeps every leaf at identical depth, minimizing disk block seeks to O(log_m n).
- Trie lookup depends only on key length L, giving O(L) prefix autocomplete independent of dictionary size.`,
  },
  {
    id: 'note-mu-csc401-u2',
    subjectCode: 'CSC401',
    unitNumber: 2,
    title: 'Module 2 Study Guide: Dynamic Programming vs Greedy Design (MU)',
    summary: 'Optimal substructure criteria, 0/1 vs fractional knapsack proof, and KMP prefix-table construction.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Greedy vs Dynamic Programming

## 1. Choosing the Right Paradigm
- Use Greedy when a locally optimal choice is provably safe via an exchange argument (Fractional Knapsack, Kruskal MST, Huffman coding).
- Use Dynamic Programming when subproblems overlap and greedy choice fails (0/1 Knapsack, Matrix Chain, LCS).

## 2. KMP Prefix Function (pi table)
- Computes longest proper prefix that is also a suffix for every pattern prefix in O(m) time, ensuring O(n + m) matching with zero text backtracking.`,
  },
  {
    id: 'note-au-cs3301-u2',
    subjectCode: 'CS3301',
    unitNumber: 2,
    title: 'Unit 2 Study Guide: Binary Heaps, AVL Trees & Priority Queues (Anna Univ.)',
    summary: 'Complete binary tree array indexing, Build-Heap O(n) proof, and AVL rotation traces for R2021 exams.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Heaps & Balanced Trees (Anna University R2021)

## 1. Binary Heap Array Indexing (1-based)
- Parent(i) = floor(i / 2), Left(i) = 2i, Right(i) = 2i + 1.
- Insert uses percolate-up in O(log n); DeleteMin swaps root with last leaf and percolates down in O(log n).
- Bottom-up BuildHeap runs in linear O(n) time because half the nodes are leaves requiring zero swaps.`,
  },
  {
    id: 'note-cbse-m12-u2',
    subjectCode: 'CBSE-M12',
    unitNumber: 2,
    title: 'Class 12 Calculus & Matrices Revision Sheet (CBSE Board Pattern)',
    summary: 'Matrix inverse system solving, standard integration properties, linear differential equations, and Bayes theorem checklist.',
    authorName: 'StudySphere Board Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# CBSE Class 12 Mathematics Core Revision

## 1. Matrix Method for Linear Systems
- AX = B has a unique solution X = A^(-1) B whenever |A| != 0, where A^(-1) = adj(A) / |A|.

## 2. Definite Integral King Property
- Integral from a to b of f(x) dx equals Integral from a to b of f(a + b - x) dx — essential for trigonometric board problems.

## 3. Linear Differential Equations
- For dy/dx + P(x)y = Q(x), Integrating Factor IF = exp(integral P(x) dx) and solution is y * IF = integral(Q * IF dx) + C.`,
  },
  {
    id: 'note-mu-csc501-u1',
    subjectCode: 'CSC501',
    unitNumber: 1,
    title: 'Sem 5 Study Guide: CPU Scheduling, Virtual Memory & TCP/IP (MU)',
    summary: 'Preemptive scheduling trade-offs, Banker safety algorithm, LRU page faults, and CIDR subnet calculation steps for Mumbai University.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Operating Systems & Networking (Mumbai University)

## 1. Deadlock Safety Check (Banker Algorithm)
- Compute Need[i] = Max[i] - Allocation[i].
- Repeatedly locate an unfinished process i with Need[i] <= Work, add Allocation[i] to Work, and record the safe sequence.

## 2. Demand Paging & Effective Access Time
- EAT = (1 - p) * T_mem + p * T_page_fault, where p is page-fault probability.
- Belady anomaly affects FIFO replacement but never occurs in stack algorithms like LRU or Optimal.

## 3. CIDR Subnetting Formula
- A /n IPv4 prefix yields 2^(32 - n) - 2 usable host addresses (excluding network and broadcast IDs).`,
  },
  {
    id: 'note-mu-itc601-u1',
    subjectCode: 'ITC601',
    unitNumber: 1,
    title: 'Sem 6 Study Guide: BCNF Normalization, Strict 2PL & Distributed REST (MU)',
    summary: 'Minimal cover decomposition, conflict serializability precedence graphs, WAL recovery, and REST/CAP architectural rules.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Database & Distributed Web Systems (MU)

## 1. BCNF vs 3NF Decomposition
- A relation is in BCNF if every non-trivial FD X -> Y has X as a superkey.
- BCNF guarantees lossless decomposition and eliminates FD redundancy; 3NF always preserves dependencies.

## 2. Strict 2PL & Crash Recovery
- Holding all exclusive (X) locks until commit/abort prevents cascading rollbacks.
- Write-Ahead Logging (WAL) mandates flushing undo/redo log records to disk before dirty data pages.`,
  },
  {
    id: 'note-au-cs3401-u1',
    subjectCode: 'CS3401',
    unitNumber: 1,
    title: 'Unit 1 & 2 Study Guide: Shortest Paths, Max-Flow & NP-Completeness (AU)',
    summary: 'Bellman-Ford negative cycle detection, Ford-Fulkerson augmenting paths, and polynomial reduction checklist for R2021 exams.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Algorithms & Operating Systems (Anna University R2021)

## 1. Shortest Paths & Max-Flow
- Bellman-Ford relaxes all E edges V - 1 times in O(V * E); a V-th relaxation detects a reachable negative-weight cycle.
- Max-Flow Min-Cut Theorem: Maximum s-t flow equals the minimum capacity across any cut separating source s from sink t.

## 2. Proving NP-Completeness
1. Show the decision problem L belongs to NP (polynomial-time certificate verifier).
2. Polynomial-time reduce a known NP-Complete problem (e.g. 3-SAT or Clique) to L.`,
  },
  {
    id: 'note-au-ec3452-u2',
    subjectCode: 'EC3452',
    unitNumber: 2,
    title: 'Unit 2 & 3 Study Guide: Smith Chart Matching & Radix-2 DIT FFT (AU)',
    summary: 'VSWR and reflection coefficient equations, quarter-wave transformer impedance, and N-point FFT butterfly complexity reduction.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Electromagnetics & Digital Signal Processing (Anna Univ.)

## 1. Transmission Line Matching
- Reflection coefficient Gamma = (Z_L - Z_0) / (Z_L + Z_0); VSWR = (1 + |Gamma|) / (1 - |Gamma|).
- Quarter-wave transformer characteristic impedance: Z_q = sqrt(Z_0 * R_L).

## 2. Radix-2 DIT FFT Efficiency
- Direct DFT requires N^2 complex multiplications; Radix-2 FFT splits even/odd indices recursively to achieve (N / 2) * log2(N) operations.`,
  },
  {
    id: 'note-au-cs3591-u2',
    subjectCode: 'CS3591',
    unitNumber: 2,
    title: 'Unit 2 & 3 Study Guide: TCP Congestion Control, OSPF & Cloud Layers (AU)',
    summary: 'Slow start threshold transitions, OSPF Dijkstra SPF computation, TLS handshake steps, and IaaS/PaaS/SaaS architecture summary.',
    authorName: 'StudySphere Multi-University Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# Computer Networks & Cloud Architecture (Anna Univ.)

## 1. TCP Congestion Window Dynamics
- Slow Start doubles cwnd every RTT until reaching ssthresh.
- Congestion Avoidance grows linearly (+1 MSS per RTT); triple duplicate ACK triggers Fast Recovery (halving cwnd).

## 2. Cloud Service Responsibility Split
- IaaS: Virtual machines, storage, VPC networking.
- PaaS: Managed runtimes and databases.
- SaaS: Turnkey browser applications.`,
  },
  {
    id: 'note-cbse-p12-u1',
    subjectCode: 'CBSE-P12',
    unitNumber: 1,
    title: 'Class 12 Physics Board Guide: Electrostatics, LCR Resonance & Optics',
    summary: 'Gauss Law symmetry templates, series LCR impedance phasors, lens-maker derivations, and Young double-slit fringe width formulas.',
    authorName: 'StudySphere Board Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# CBSE Class 12 Physics High-Yield Revision

## 1. Gauss Law Key Field Formulas
- Infinite line charge (lambda): E = lambda / (2 * pi * eps_0 * r).
- Infinite plane sheet (sigma): E = sigma / (2 * eps_0), independent of distance.

## 2. Series LCR AC Resonance
- Impedance Z = sqrt(R^2 + (X_L - X_C)^2); at resonance X_L = X_C so omega_0 = 1 / sqrt(LC) and power factor cos(phi) = 1.

## 3. Wave Optics Fringe Width
- Young Double-Slit Experiment: beta = (lambda * D) / d; all interference fringes have equal width and intensity.`,
  },
  {
    id: 'note-cbse-c12-u1',
    subjectCode: 'CBSE-C12',
    unitNumber: 1,
    title: 'Class 12 Chemistry Board Guide: Nernst Equation, Kinetics & Named Reactions',
    summary: 'Electrochemical cell EMF calculations, first-order integrated rate law, CFT d-orbital splitting, and Aldol/Cannizzaro mechanisms.',
    authorName: 'StudySphere Board Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# CBSE Class 12 Chemistry Board Revision

## 1. Nernst Equation (at 298 K)
- E_cell = E0_cell - (0.0591 / n) * log10(Q); Gibbs free energy Delta G0 = -n * F * E0_cell.

## 2. First-Order Chemical Kinetics
- k = (2.303 / t) * log10([R]_0 / [R]); half-life t_(1/2) = 0.693 / k is independent of initial concentration.

## 3. High-Yield Carbonyl Named Reactions
- Aldol Condensation: Aldehydes/ketones with at least one alpha-H in dilute NaOH form beta-hydroxy carbonyls.
- Cannizzaro Reaction: Aldehydes lacking alpha-H (HCHO, C6H5CHO) disproportionate in concentrated NaOH.`,
  },
  {
    id: 'note-cbse-cs12-u2',
    subjectCode: 'CBSE-CS12',
    unitNumber: 2,
    title: 'Class 12 Computer Science Guide: Python Files, Stacks & SQL Queries',
    summary: 'CSV/pickle file operations, list-based stack functions, SQL GROUP BY/JOIN templates, and networking protocol comparisons.',
    authorName: 'StudySphere Board Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# CBSE Class 12 Computer Science (Python & SQL)

## 1. Python Stack Operations (LIFO)
- Push: stack.append(item)
- Pop: stack.pop() after checking len(stack) > 0 to avoid Underflow.

## 2. SQL Query Execution Order
- FROM / JOIN → WHERE (row filter) → GROUP BY → HAVING (group filter) → SELECT → ORDER BY.
- Remember: Aggregate functions (COUNT, SUM, AVG, MAX, MIN) belong in SELECT or HAVING, never directly in WHERE.`,
  },
  {
    id: 'note-cbse-b12-u1',
    subjectCode: 'CBSE-B12',
    unitNumber: 1,
    title: 'Class 12 Biology Board Guide: Lac Operon, PCR Biotechnology & Ecology',
    summary: 'Central dogma transcription steps, inducible lac operon control, PCR denaturation/annealing/extension cycles, and logistic growth.',
    authorName: 'StudySphere Board Editorial',
    license: 'Original StudySphere',
    publishedAt: '2026-11-23',
    featured: false,
    contentMarkdown: `# CBSE Class 12 Biology Core Revision

## 1. Molecular Genetics & Lac Operon
- In absence of lactose, repressor binds operator (o) blocking RNA polymerase.
- In presence of lactose (inducer), repressor is inactivated and structural genes z, y, a are transcribed.

## 2. PCR Three-Step Thermal Cycle
1. Denaturation (~94 C): Separate double-stranded DNA template.
2. Annealing (~55 C): Forward and reverse primers bind complementary ends.
3. Extension (~72 C): Thermostable Taq polymerase synthesizes new DNA strands.`,
  },
];

/**
 * Helper to build clean, consistent 70-mark original exam practice blueprints
 * for every remaining indexed subject so zero subjects have empty PYQ tabs.
 */
function buildStandardBlueprint(params: {
  id: string;
  subjectCode: string;
  title: string;
  examYear: number;
  examSession: PyqPaper['examSession'];
  authorNote: string;
  featured?: boolean;
  secA: Array<{ text: string; unit: number }>;
  secB: Array<{ text: string; unit: number }>;
  secC: Array<{ text: string; unit: number }>;
}): PyqPaper {
  return {
    id: params.id,
    subjectCode: params.subjectCode,
    title: params.title,
    examYear: params.examYear,
    examSession: params.examSession,
    paperType: 'Original Practice Blueprint',
    authorNote: params.authorNote,
    publishedAt: '2026-11-23',
    featured: Boolean(params.featured),
    durationMinutes: 180,
    maxMarks: 70,
    sections: [
      {
        name: 'Section A — Short Conceptual Questions (14 Marks)',
        instruction: 'Attempt all 7 questions in brief. Each question carries 2 marks.',
        questions: params.secA.map((q, i) => ({
          number: `1(${String.fromCharCode(97 + i)})`,
          text: q.text,
          marks: 2,
          unitNumber: q.unit,
        })),
      },
      {
        name: 'Section B — Analytical & Numerical Problems (21 Marks)',
        instruction: 'Attempt any 3 of the following 5 questions. Each question carries 7 marks.',
        questions: params.secB.map((q, i) => ({
          number: `2(${String.fromCharCode(97 + i)})`,
          text: q.text,
          marks: 7,
          unitNumber: q.unit,
        })),
      },
      {
        name: 'Section C — Unit-Wise In-Depth Questions (35 Marks)',
        instruction: 'Attempt one question from each unit (5 × 7 = 35 marks).',
        questions: params.secC.map((q, i) => ({
          number: `Q${i + 3}`,
          text: q.text,
          marks: 7,
          unitNumber: q.unit,
        })),
      },
    ],
  };
}

export const EXTENDED_PYQS: PyqPaper[] = [
  buildStandardBlueprint({
    id: 'pyq-bas203-2025',
    subjectCode: 'BAS203',
    title: 'Engineering Mathematics II — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original AKTU-pattern paper covering higher-order ODEs, Laplace transforms, Fourier series, and complex residue integration.',
    secA: [
      { text: 'Write the complementary function for (D^3 - 6D^2 + 11D - 6)y = 0.', unit: 1 },
      { text: 'State the first shifting theorem of Laplace transforms with one example.', unit: 2 },
      { text: 'State the Ratio Test for convergence of positive term series.', unit: 3 },
      { text: 'Write the Cauchy-Riemann equations in Cartesian form.', unit: 4 },
      { text: 'Define an isolated essential singularity with an example.', unit: 5 },
      { text: 'State Dirichlet conditions for a Fourier series expansion.', unit: 3 },
      { text: 'Define a harmonic conjugate of an analytic function.', unit: 4 },
    ],
    secB: [
      { text: 'Solve (D^2 + 4)y = sec(2x) using the method of variation of parameters.', unit: 1 },
      { text: 'Use Laplace transforms to solve y\'\' + 2y\' + 5y = e^(-t) sin(t) given y(0)=0, y\'(0)=1.', unit: 2 },
      { text: 'Obtain the Fourier series of f(x) = x^2 in the interval (-pi, pi) and deduce sum(1/n^2).', unit: 3 },
      { text: 'Construct the analytic function f(z) = u + iv whose real part is u = e^x (x cos y - y sin y).', unit: 4 },
      { text: 'Expand f(z) = 1 / [(z - 1)(z - 2)] in Laurent series valid for 1 < |z| < 2.', unit: 5 },
    ],
    secC: [
      { text: 'Solve the Cauchy-Euler differential equation x^2 y\'\' - 3x y\' + 4y = 2x^2.', unit: 1 },
      { text: 'State and apply the Convolution Theorem to evaluate L^(-1){ s / (s^2 + a^2)^2 }.', unit: 2 },
      { text: 'Test convergence of the series sum [ (n!)^2 / (2n)! ] x^n for x > 0.', unit: 3 },
      { text: 'Find the bilinear transformation mapping z = 1, i, -1 onto w = i, 0, -i.', unit: 4 },
      { text: 'Using Cauchy Residue Theorem, evaluate integral from 0 to 2*pi of d(theta) / (5 + 3 cos theta).', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bee101-2025',
    subjectCode: 'BEE101',
    title: 'Fundamentals of Electrical Engineering — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original exam blueprint covering DC theorems, RLC resonance, single-phase transformers, induction motors, and earthing safety.',
    secA: [
      { text: 'State Thevenin theorem and list its limitations for nonlinear circuits.', unit: 1 },
      { text: 'Define power factor and distinguish between active, reactive, and apparent power.', unit: 2 },
      { text: 'Why is a transformer rated in kVA rather than kW?', unit: 3 },
      { text: 'Define slip in a three-phase induction motor and state its value at standstill.', unit: 4 },
      { text: 'Differentiate between MCB and ELCB protective devices.', unit: 5 },
      { text: 'Write the relation between line and phase voltage in a balanced star connection.', unit: 2 },
      { text: 'Why is the core of a transformer laminated?', unit: 3 },
    ],
    secB: [
      { text: 'Use nodal analysis to find all branch currents in a bridge DC network with two independent sources.', unit: 1 },
      { text: 'Derive the resonant frequency and bandwidth for a series RLC circuit and compute Q-factor for R=10 ohm, L=0.1 H, C=10 uF.', unit: 2 },
      { text: 'Derive the EMF equation of a single-phase transformer and explain core and copper losses.', unit: 3 },
      { text: 'Explain the working principle of a three-phase induction motor and sketch its torque-slip curve.', unit: 4 },
      { text: 'Explain plate earthing and calculate monthly electricity bill for a domestic load schedule.', unit: 5 },
    ],
    secC: [
      { text: 'State and prove the Maximum Power Transfer Theorem for a DC network and solve a numerical example.', unit: 1 },
      { text: 'Derive active power measurement in a balanced three-phase load using the two-wattmeter method.', unit: 2 },
      { text: 'Draw the exact and approximate equivalent circuits of a single-phase transformer referred to primary and derive maximum efficiency condition.', unit: 3 },
      { text: 'Compare DC shunt, series, and compound motors on torque-current and speed-load characteristics.', unit: 4 },
      { text: 'Compare lead-acid and lithium-ion battery technologies and explain UPS backup architecture.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs302-2025',
    subjectCode: 'BCS302',
    title: 'Computer Organization & Architecture — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam paper covering bus arbitration, Booth multiplication, pipelining hazards, cache mapping, and DMA controllers.',
    secA: [
      { text: 'Compare daisy-chaining and polling bus arbitration schemes.', unit: 1 },
      { text: 'Represent -13.625 in IEEE 754 single-precision floating-point format.', unit: 2 },
      { text: 'Distinguish between hardwired and microprogrammed control units.', unit: 3 },
      { text: 'Define cache hit ratio and effective memory access time.', unit: 4 },
      { text: 'Explain cycle stealing mode in Direct Memory Access (DMA).', unit: 5 },
      { text: 'Compare RISC and CISC instruction set characteristics.', unit: 3 },
      { text: 'What is the role of the Translation Lookaside Buffer (TLB)?', unit: 4 },
    ],
    secB: [
      { text: 'Explain six addressing modes with effective address formulas and assembly examples.', unit: 1 },
      { text: 'Multiply (-7) × (+3) using Booth signed multiplication algorithm showing step-by-step registers.', unit: 2 },
      { text: 'Explain 4-stage instruction pipelining and discuss structural, data, and control hazards.', unit: 3 },
      { text: 'A 32 KB direct-mapped cache has 64-byte blocks and a 32-bit address space. Calculate tag, index, and offset bits.', unit: 4 },
      { text: 'Explain interrupt-driven I/O with vectored priority interrupts and compare with programmed I/O.', unit: 5 },
    ],
    secC: [
      { text: 'Design a common bus system for four 4-bit registers using multiplexers and explain RTL micro-operations.', unit: 1 },
      { text: 'Design a 4-bit Carry Look-Ahead Adder with generate and propagate logic equations.', unit: 2 },
      { text: 'Explain horizontal versus vertical microprogramming and trace the micro-sequence for an ADD instruction.', unit: 3 },
      { text: 'Compare direct, fully associative, and 4-way set-associative cache mapping with write-through vs write-back policies.', unit: 4 },
      { text: 'Draw and explain the architecture of a DMA controller and trace a complete block transfer between disk and RAM.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs303-2025',
    subjectCode: 'BCS303',
    title: 'Discrete Structures & Theory of Logic — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam blueprint covering posets, Hasse diagrams, groups, lattices, K-maps, predicate logic, and recurrences.',
    secA: [
      { text: 'Define an equivalence relation and give an example on the set of integers.', unit: 1 },
      { text: 'State Lagrange theorem for finite groups.', unit: 2 },
      { text: 'Define a complemented distributive lattice.', unit: 3 },
      { text: 'Check whether ((P -> Q) AND P) -> Q is a tautology.', unit: 4 },
      { text: 'State the Pigeonhole Principle with one combinatorial application.', unit: 5 },
      { text: 'Distinguish between an Eulerian circuit and a Hamiltonian cycle.', unit: 5 },
      { text: 'Convert P -> (Q OR R) into Conjunctive Normal Form (CNF).', unit: 4 },
    ],
    secB: [
      { text: 'Draw the Hasse diagram of (D_36, |) and identify maximal, minimal, greatest, and least elements.', unit: 1 },
      { text: 'Prove that the set of cube roots of unity forms an abelian group under complex multiplication.', unit: 2 },
      { text: 'Simplify F(A,B,C,D) = sum m(0,1,2,5,8,9,10) + d(4,12) using a 4-variable K-map.', unit: 3 },
      { text: 'Verify validity of a predicate logic argument using universal instantiation and modus ponens.', unit: 4 },
      { text: 'Solve the recurrence relation a_n - 5a_(n-1) + 6a_(n-2) = 2^n with a_0 = 1, a_1 = 4.', unit: 5 },
    ],
    secC: [
      { text: 'Prove by mathematical induction that 7^n - 2^n is divisible by 5 for every integer n >= 1.', unit: 1 },
      { text: 'Explain normal subgroups, quotient groups, and prove that every cyclic group is abelian.', unit: 2 },
      { text: 'Prove that a lattice is distributive if and only if it contains no sublattice isomorphic to M3 or N5.', unit: 3 },
      { text: 'Use resolution refutation in propositional logic to prove a conclusion from four given premises.', unit: 4 },
      { text: 'State Euler formula for connected planar graphs and prove K_5 and K_(3,3) are non-planar.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bec301-2025',
    subjectCode: 'BEC301',
    title: 'Electronic Devices — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam blueprint covering semiconductor bands, Hall effect, p-n junction electrostatics, BJT hybrid-pi, and MOSFETs.',
    secA: [
      { text: 'State the Mass-Action Law for semiconductors in thermal equilibrium.', unit: 1 },
      { text: 'Write the Einstein relation linking diffusion constant and carrier mobility.', unit: 2 },
      { text: 'Differentiate between Zener and avalanche breakdown mechanisms.', unit: 3 },
      { text: 'Explain the Early effect (base-width modulation) in a BJT.', unit: 4 },
      { text: 'Define threshold voltage V_T of an enhancement n-channel MOSFET.', unit: 5 },
      { text: 'Distinguish between direct and indirect bandgap semiconductors.', unit: 1 },
      { text: 'Compare transition capacitance and diffusion capacitance of a p-n diode.', unit: 3 },
    ],
    secB: [
      { text: 'Derive the intrinsic carrier concentration n_i as a function of temperature and bandgap energy.', unit: 1 },
      { text: 'Derive the Hall voltage expression and explain how Hall effect determines carrier type and mobility.', unit: 2 },
      { text: 'Derive the built-in potential and depletion width of an abrupt step p-n junction under reverse bias.', unit: 3 },
      { text: 'Explain current components in an n-p-n BJT in active mode and relate alpha, beta, and gamma.', unit: 4 },
      { text: 'Derive the drain current I_D equations of a MOSFET in linear and saturation regions.', unit: 5 },
    ],
    secC: [
      { text: 'Sketch Fermi level position versus doping and temperature for n-type and p-type silicon.', unit: 1 },
      { text: 'Derive the one-dimensional minority carrier continuity equation under steady-state optical injection.', unit: 2 },
      { text: 'Derive the ideal diode Shockley I-V equation and explain deviations in real silicon diodes.', unit: 3 },
      { text: 'Draw the small-signal hybrid-pi model of a BJT and define g_m, r_pi, and r_o.', unit: 4 },
      { text: 'Explain MOS capacitor high-frequency vs low-frequency C-V curves and compare LED vs photodiode operation.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bme301-2025',
    subjectCode: 'BME301',
    title: 'Thermodynamics — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam blueprint covering First Law SFEE, entropy & exergy, steam properties, Rankine/VCR cycles, and Otto/Diesel cycles.',
    secA: [
      { text: 'State the Zeroth Law of Thermodynamics and its role in thermometry.', unit: 1 },
      { text: 'State the Kelvin-Planck and Clausius statements of the Second Law.', unit: 2 },
      { text: 'Define dryness fraction and triple point of a pure substance.', unit: 3 },
      { text: 'Why is Carnot vapor cycle impractical for steam power plants?', unit: 4 },
      { text: 'Write all four Maxwell thermodynamic relations.', unit: 5 },
      { text: 'Define availability (exergy) and irreversibility of a process.', unit: 2 },
      { text: 'Compare COP of a refrigerator and a heat pump operating between the same reservoirs.', unit: 4 },
    ],
    secB: [
      { text: 'Derive the Steady Flow Energy Equation (SFEE) and apply it to a nozzle and a steam turbine.', unit: 1 },
      { text: 'Prove the equivalence of Kelvin-Planck and Clausius statements and derive Clausius inequality.', unit: 2 },
      { text: 'Explain separating and throttling calorimeter to measure dryness fraction of wet steam.', unit: 3 },
      { text: 'Analyze an ideal Rankine cycle with reheat on T-s diagram and compute thermal efficiency.', unit: 4 },
      { text: 'Derive air-standard efficiency of the Otto cycle as a function of compression ratio r.', unit: 5 },
    ],
    secC: [
      { text: 'A closed piston-cylinder undergoes a polytropic expansion PV^1.3 = C. Derive and compute work and heat transfer.', unit: 1 },
      { text: 'Derive entropy change of an ideal gas and compute total entropy generation during thermal mixing.', unit: 2 },
      { text: 'Sketch P-v, T-s, and h-s Mollier diagrams for water showing critical point and constant-pressure lines.', unit: 3 },
      { text: 'Analyze a vapor compression refrigeration cycle with subcooling and superheating on P-h and T-s plots.', unit: 4 },
      { text: 'Compare Otto, Diesel, and Dual cycles for identical compression ratio and heat rejection, and derive Clapeyron equation.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bce301-2025',
    subjectCode: 'BCE301',
    title: 'Engineering Mechanics — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam blueprint covering equilibrium, trusses, Coulomb friction, centroids/MOI, SFD/BMD, and rigid body kinetics.',
    secA: [
      { text: 'State Varignon theorem of moments with a neat sketch.', unit: 1 },
      { text: 'Define angle of friction and angle of repose.', unit: 2 },
      { text: 'State the Parallel Axis Theorem for area moment of inertia.', unit: 3 },
      { text: 'Define point of contraflexure in a loaded beam.', unit: 4 },
      { text: 'State D\'Alembert principle for dynamic equilibrium.', unit: 5 },
      { text: 'State the two theorems of Pappus-Guldinus.', unit: 3 },
      { text: 'Write the relationship between load intensity, shear force, and bending moment.', unit: 4 },
    ],
    secB: [
      { text: 'Find the resultant magnitude, direction, and line of action of a coplanar non-concurrent force system.', unit: 1 },
      { text: 'Analyze a simply supported Pratt roof truss using Method of Joints and verify one chord by Method of Sections.', unit: 2 },
      { text: 'Determine centroid and I_xx, I_yy of an unsymmetrical I-section composite area.', unit: 3 },
      { text: 'Draw Shear Force and Bending Moment diagrams for an overhanging beam carrying UDL and point loads.', unit: 4 },
      { text: 'Derive the equation of trajectory for a projectile and find range on an inclined plane.', unit: 5 },
    ],
    secC: [
      { text: 'Determine support reactions for a 3D rigid frame under spatial forces using vector equilibrium.', unit: 1 },
      { text: 'Derive the belt friction ratio T1/T2 = e^(mu*theta) and solve a ladder friction limiting equilibrium problem.', unit: 2 },
      { text: 'Compute principal moments of inertia and orientation of principal axes for an L-angle section.', unit: 3 },
      { text: 'Use the Principle of Virtual Work to find reaction forces in a connected pin-jointed toggle mechanism.', unit: 4 },
      { text: 'Solve a colliding spheres and rolling cylinder problem using work-energy and impulse-momentum equations.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs402-2025',
    subjectCode: 'BCS402',
    title: 'Theory of Automata & Formal Languages — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original exam paper covering DFA/NFA conversion, Arden/Pumping Lemma, CNF/GNF, PDA construction, and Turing decidability.',
    secA: [
      { text: 'Distinguish between Mealy and Moore finite state machines.', unit: 1 },
      { text: 'State Arden theorem for solving regular expression equations.', unit: 2 },
      { text: 'Define an ambiguous context-free grammar with an example.', unit: 3 },
      { text: 'Compare acceptance by final state and empty stack in a PDA.', unit: 4 },
      { text: 'State the Church-Turing Thesis and define recursive vs recursively enumerable languages.', unit: 5 },
      { text: 'State the Pumping Lemma for regular languages.', unit: 2 },
      { text: 'List the four levels of the Chomsky hierarchy with corresponding automata.', unit: 5 },
    ],
    secB: [
      { text: 'Convert a given epsilon-NFA to an equivalent minimal DFA using subset construction and Myhill-Nerode equivalence.', unit: 1 },
      { text: 'Prove using the Pumping Lemma that L = { 0^n 1^n | n >= 1 } is not regular.', unit: 2 },
      { text: 'Eliminate null, unit, and useless productions and convert a given CFG into Chomsky Normal Form (CNF).', unit: 3 },
      { text: 'Design a Pushdown Automaton accepting L = { w c w^R | w in {a, b}* } and trace an input string.', unit: 4 },
      { text: 'Design a Turing Machine that accepts L = { a^n b^n c^n | n >= 1 } with state transitions.', unit: 5 },
    ],
    secC: [
      { text: 'Construct a Mealy machine for 2\'s complement of a binary number and convert it to an equivalent Moore machine.', unit: 1 },
      { text: 'Prove closure properties of regular languages under union, intersection, complement, and homomorphism.', unit: 2 },
      { text: 'Convert a given CFG into Greibach Normal Form (GNF) after removing left recursion.', unit: 3 },
      { text: 'Prove equivalence of Context-Free Grammars and Pushdown Automata with formal construction steps.', unit: 4 },
      { text: 'Prove undecidability of the Halting Problem via diagonalization and explain Post Correspondence Problem (PCP).', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs601-2025',
    subjectCode: 'BCS601',
    title: 'Software Engineering — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original exam blueprint covering SDLC/Agile, SRS/DFD, cohesion/coupling, cyclomatic complexity, testing, and COCOMO.',
    secA: [
      { text: 'Contrast Waterfall and Spiral SDLC models on risk management.', unit: 1 },
      { text: 'Distinguish between functional and non-functional requirements.', unit: 2 },
      { text: 'Why is high cohesion and low coupling desirable in modular software design?', unit: 3 },
      { text: 'Differentiate between verification and validation.', unit: 4 },
      { text: 'Compare corrective, adaptive, and perfective software maintenance.', unit: 5 },
      { text: 'Define cyclomatic complexity V(G) using control flow graph edges and nodes.', unit: 3 },
      { text: 'Compare black-box testing and white-box testing.', unit: 4 },
    ],
    secB: [
      { text: 'Explain Scrum Agile ceremonies, backlog refinement, sprint velocity, and compare with CMMI maturity levels.', unit: 1 },
      { text: 'Prepare Level-0 and Level-1 Data Flow Diagrams (DFD) and Use-Case diagram for an online university library system.', unit: 2 },
      { text: 'Compute Halstead length, vocabulary, volume, and difficulty for a sample sorting function.', unit: 3 },
      { text: 'Design test cases using Boundary Value Analysis and Equivalence Partitioning for a triangle classifier module.', unit: 4 },
      { text: 'Estimate effort and development time using Basic and Intermediate COCOMO for a 45 KLOC semi-detached project.', unit: 5 },
    ],
    secC: [
      { text: 'Compare Prototyping, Iterative, RAD, and Agile process models with suitable project selection criteria.', unit: 1 },
      { text: 'Describe IEEE 830 SRS document structure, requirements elicitation techniques, and traceability matrices.', unit: 2 },
      { text: 'Classify all levels of cohesion and coupling from best to worst with concrete architectural examples.', unit: 3 },
      { text: 'Explain Basis Path Testing, integration strategies (top-down, bottom-up, sandwich), and regression testing.', unit: 4 },
      { text: 'Explain software configuration management, risk exposure calculation (RMMM), and reverse engineering.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs701-2025',
    subjectCode: 'BCS701',
    title: 'Distributed Systems & Cloud Fundamentals — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original exam paper covering Lamport/vector clocks, Ricart-Agrawala, Raft/Paxos consensus, fault tolerance, and consistent hashing.',
    secA: [
      { text: 'State the happens-before relation defined by Lamport logical clocks.', unit: 1 },
      { text: 'Compare Bully and Ring leader election algorithms on message complexity.', unit: 2 },
      { text: 'State the CAP theorem and explain the trade-off during a network partition.', unit: 3 },
      { text: 'Distinguish between crash-stop and Byzantine failure models.', unit: 4 },
      { text: 'Why does consistent hashing minimize key movement when nodes join or leave?', unit: 5 },
      { text: 'Differentiate between linearizability and eventual consistency.', unit: 3 },
      { text: 'Compare hypervisor virtual machines and OS-level containers.', unit: 5 },
    ],
    secB: [
      { text: 'Trace Chandy-Lamport distributed snapshot algorithm on a 3-process system with in-flight messages.', unit: 1 },
      { text: 'Explain Ricart-Agrawala distributed mutual exclusion and prove its 2(N - 1) message bound.', unit: 2 },
      { text: 'Explain Two-Phase Commit (2PC) protocol and identify its blocking failure scenarios.', unit: 3 },
      { text: 'Explain coordinated vs uncoordinated checkpointing and the domino effect during rollback recovery.', unit: 4 },
      { text: 'Design a horizontally scalable key-value store using consistent hashing with virtual nodes and quorum reads/writes.', unit: 5 },
    ],
    secC: [
      { text: 'Compare Lamport clocks and Vector clocks and prove why vector clocks capture exact causality.', unit: 1 },
      { text: 'Explain edge-chasing distributed deadlock detection (Chandy-Misra-Haas) with probe messages.', unit: 2 },
      { text: 'Explain Raft consensus leader election, log replication, and safety guarantees under split votes.', unit: 3 },
      { text: 'Explain Practical Byzantine Fault Tolerance (PBFT) phases and why 3f + 1 replicas are needed.', unit: 4 },
      { text: 'Compare IaaS, PaaS, SaaS, and edge-compute deployment architectures with real-world scaling patterns.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bcs801-2025',
    subjectCode: 'BCS801',
    title: 'Capstone Engineering Design & Ethics — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original exam blueprint covering research methodology, technical architecture benchmarks, intellectual property, and open-source licensing.',
    secA: [
      { text: 'Distinguish between primary literature review and secondary survey papers.', unit: 1 },
      { text: 'Define reproducible builds in software and engineering validation.', unit: 2 },
      { text: 'Differentiate between copyright, patent, and trademark protection.', unit: 3 },
      { text: 'Compare MIT (permissive) and GPLv3 (copyleft) software licenses.', unit: 3 },
      { text: 'What makes a capstone problem statement measurable and falsifiable?', unit: 1 },
      { text: 'List three core elements of an engineering trade-off matrix.', unit: 2 },
      { text: 'Explain CC BY-SA 4.0 attribution and share-alike obligations.', unit: 3 },
    ],
    secB: [
      { text: 'Draft a structured literature review methodology and citation-ethics checklist avoiding plagiarism.', unit: 1 },
      { text: 'Design a validation benchmark plan including latency, accuracy, reliability, and failure recovery metrics.', unit: 2 },
      { text: 'Analyze an open-source licensing compatibility scenario mixing Apache 2.0, MIT, and AGPL dependencies.', unit: 3 },
      { text: 'Write a concise feasibility evaluation comparing cost, technical risk, and schedule constraints for a final-year prototype.', unit: 1 },
      { text: 'Explain engineering ethics case analysis involving user privacy, safety disclosures, and conflict of interest.', unit: 3 },
    ],
    secC: [
      { text: 'Develop a complete System Requirements Specification (SRS) outline and risk register for an interdisciplinary capstone system.', unit: 1 },
      { text: 'Present an architecture decision record (ADR) evaluating monolithic vs edge-distributed deployment with testability criteria.', unit: 2 },
      { text: 'Compare patent filing lifecycle in India, trade secret protection, and Creative Commons open educational publishing.', unit: 3 },
      { text: 'Design a technical documentation suite (API spec, runbook, evaluation report) ensuring long-term project handoff.', unit: 2 },
      { text: 'Evaluate ethical governance principles for independent free educational platforms serving public students.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bec401-2025',
    subjectCode: 'BEC401',
    title: 'Digital System Design — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original blueprint covering Quine-McCluskey minimization, synchronous FSMs, hazards, CMOS families, and VHDL modeling.',
    secA: [
      { text: 'Define prime implicant and essential prime implicant.', unit: 1 },
      { text: 'Distinguish between Mealy and Moore sequential machines.', unit: 2 },
      { text: 'What is a static-1 hazard and how is it eliminated?', unit: 3 },
      { text: 'Define noise margin and propagation delay in CMOS logic.', unit: 4 },
      { text: 'Compare structural and behavioral VHDL modeling styles.', unit: 5 },
      { text: 'Write the excitation table of a JK flip-flop.', unit: 2 },
      { text: 'Differentiate between PLA and PAL programmable architectures.', unit: 4 },
    ],
    secB: [
      { text: 'Minimize F(A,B,C,D) = sum m(0,1,2,5,6,7,8,9,10,14) using Quine-McCluskey tabular method.', unit: 1 },
      { text: 'Design an overlapping 1011 sequence detector using Moore FSM and D flip-flops.', unit: 2 },
      { text: 'Design a synchronous Mod-6 up-down counter using JK flip-flops and check unused states.', unit: 3 },
      { text: 'Compare TTL and CMOS inverter transfer characteristics, power dissipation, and fan-out.', unit: 4 },
      { text: 'Write synthesizable VHDL code for a 4-bit synchronous counter with asynchronous reset.', unit: 5 },
    ],
    secC: [
      { text: 'Implement a 4-bit Carry Look-Ahead Adder and realize a 4-variable Boolean function using an 8:1 MUX.', unit: 1 },
      { text: 'Perform state minimization using an implication table and synthesize the reduced synchronous state machine.', unit: 2 },
      { text: 'Analyze critical vs non-critical races in asynchronous sequential circuits and design a hazard-free network.', unit: 3 },
      { text: 'Explain FPGA Configurable Logic Block (CLB), LUTs, and interconnect routing architecture.', unit: 4 },
      { text: 'Write a VHDL structural architecture and testbench for a 4-bit ALU supporting arithmetic and logic operations.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bme401-2025',
    subjectCode: 'BME401',
    title: 'Fluid Mechanics & Fluid Machines — 70-Mark Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original blueprint covering hydrostatics, Bernoulli flow meters, Darcy-Weisbach pipe losses, boundary layers, and turbines/pumps.',
    secA: [
      { text: 'Define metacentric height and state the condition for stable equilibrium of a floating body.', unit: 1 },
      { text: 'State the assumptions underlying Bernoulli energy equation.', unit: 2 },
      { text: 'Write the Hagen-Poiseuille equation for laminar pipe flow.', unit: 3 },
      { text: 'Define boundary layer displacement thickness.', unit: 4 },
      { text: 'Define NPSH and cavitation in a centrifugal pump.', unit: 5 },
      { text: 'State Buckingham Pi theorem for dimensional analysis.', unit: 4 },
      { text: 'Distinguish between impulse and reaction hydraulic turbines.', unit: 5 },
    ],
    secB: [
      { text: 'Derive total hydrostatic force and center of pressure on an inclined submerged plane surface.', unit: 1 },
      { text: 'Derive the discharge formula for a horizontal venturimeter and solve a mercury U-tube manometer numerical.', unit: 2 },
      { text: 'Derive the Darcy-Weisbach formula for friction head loss and compute discharge through two pipes in parallel.', unit: 3 },
      { text: 'Explain boundary layer separation over curved surfaces and methods to delay separation.', unit: 4 },
      { text: 'Draw velocity triangles for a Pelton wheel and derive condition for maximum hydraulic efficiency.', unit: 5 },
    ],
    secC: [
      { text: 'Derive the 3D continuity equation in Cartesian coordinates and verify whether a given flow is irrotational.', unit: 2 },
      { text: 'Derive velocity and shear stress distributions for laminar flow between two fixed parallel plates.', unit: 3 },
      { text: 'Use Buckingham Pi theorem to express pressure drop in a pipe as a function of Reynolds number and roughness.', unit: 4 },
      { text: 'Compare Francis, Kaplan, and Pelton turbines on specific speed, head range, and draft tube function.', unit: 5 },
      { text: 'Analyze centrifugal pump manometric efficiency, priming, and multistage series/parallel operation.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bce401-2025',
    subjectCode: 'BCE401',
    title: 'Structural Analysis — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original blueprint covering indeterminacy, Castigliano deflections, ILDs, arches, slope-deflection, and moment distribution.',
    secA: [
      { text: 'Distinguish between static and kinematic indeterminacy with one frame example.', unit: 1 },
      { text: 'State the Muller-Breslau principle for Influence Line Diagrams.', unit: 2 },
      { text: 'State Eddy theorem for three-hinged arches.', unit: 3 },
      { text: 'Define carry-over factor and distribution factor in Hardy Cross method.', unit: 4 },
      { text: 'Differentiate between flexibility and stiffness matrix methods.', unit: 5 },
      { text: 'State Castigliano second theorem.', unit: 1 },
      { text: 'What is the function of a stiffening girder in a suspension bridge?', unit: 3 },
    ],
    secB: [
      { text: 'Use the unit load method to find vertical and horizontal deflection at the free end of a pin-jointed truss.', unit: 1 },
      { text: 'Construct ILDs for shear force and bending moment at a section in a simply supported beam under moving wheel loads.', unit: 2 },
      { text: 'Analyze a three-hinged parabolic arch carrying a concentrated load and compute normal thrust and radial shear.', unit: 3 },
      { text: 'Analyze a two-span continuous beam with sinking intermediate support using Slope-Deflection equations.', unit: 4 },
      { text: 'Assemble the global stiffness matrix for a two-span continuous beam with fixed far ends.', unit: 5 },
    ],
    secC: [
      { text: 'Analyze a propped cantilever beam carrying UDL using strain energy method and draw SFD and BMD.', unit: 1 },
      { text: 'Determine absolute maximum bending moment for a train of four moving loads crossing a 24 m girder.', unit: 2 },
      { text: 'Derive horizontal thrust in a two-hinged parabolic arch under UDL and temperature rise.', unit: 3 },
      { text: 'Analyze a portal frame with side sway using Hardy Cross Moment Distribution Method.', unit: 4 },
      { text: 'Solve a 2-bar planar truss for joint displacements and member axial forces via direct stiffness method.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bee401-2025',
    subjectCode: 'BEE401',
    title: 'Electrical Machines I — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original blueprint covering energy conversion, DC generators/motors, OC/SC tests, and three-phase transformer connections.',
    secA: [
      { text: 'Distinguish between field energy and co-energy in a nonlinear magnetic system.', unit: 1 },
      { text: 'Compare lap and wave armature windings in DC machines.', unit: 2 },
      { text: 'Why should a DC series motor never be started without mechanical load?', unit: 3 },
      { text: 'Define all-day efficiency of a distribution transformer.', unit: 4 },
      { text: 'State the essential conditions for parallel operation of three-phase transformers.', unit: 5 },
      { text: 'What is the purpose of interpoles and compensating windings?', unit: 2 },
      { text: 'Explain copper saving in an auto-transformer as a function of turns ratio.', unit: 4 },
    ],
    secB: [
      { text: 'Derive mechanical force expression for a singly excited electromagnetic relay from field energy.', unit: 1 },
      { text: 'Explain armature reaction, cross-magnetizing and demagnetizing ampere-turns, and commutation remedies.', unit: 2 },
      { text: 'Explain Ward-Leonard speed control and Swinburne test for efficiency estimation of a DC shunt machine.', unit: 3 },
      { text: 'Determine equivalent circuit parameters and voltage regulation from OC and SC test data on a 20 kVA transformer.', unit: 4 },
      { text: 'Explain Scott (T-T) connection for 3-phase to 2-phase conversion with phasor diagram.', unit: 5 },
    ],
    secC: [
      { text: 'Derive electromagnetic torque for a doubly excited rotating electromechanical system.', unit: 1 },
      { text: 'Explain open-circuit and load characteristics of DC shunt and compound generators and critical field resistance.', unit: 2 },
      { text: 'Describe Hopkinson back-to-back test on two identical DC shunt machines and derive efficiency formulas.', unit: 3 },
      { text: 'Analyze load sharing between two single-phase transformers in parallel with unequal percentage impedances.', unit: 4 },
      { text: 'Explain Yy0, Dd0, Yd1, and Dy11 three-phase transformer vector groups and tertiary winding harmonic suppression.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bec501-2025',
    subjectCode: 'BEC501',
    title: 'Signals & Systems — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original blueprint covering LTI convolution, Fourier transforms, Laplace ROC stability, Nyquist sampling, and Z-transforms.',
    secA: [
      { text: 'Distinguish between energy signals and power signals with one example each.', unit: 1 },
      { text: 'State Parseval energy relation for Fourier transforms.', unit: 2 },
      { text: 'State the condition on Laplace ROC for a causal LTI system to be BIBO stable.', unit: 3 },
      { text: 'Define Nyquist rate and explain aliasing distortion.', unit: 4 },
      { text: 'Relate the s-plane imaginary axis to the z-plane unit circle.', unit: 5 },
      { text: 'Define causality and time-invariance for discrete-time systems.', unit: 1 },
      { text: 'State the Initial and Final Value Theorems for Z-transforms.', unit: 5 },
    ],
    secB: [
      { text: 'Compute the continuous-time convolution y(t) = e^(-2t) u(t) * u(t - 1) graphically and analytically.', unit: 1 },
      { text: 'Find the Fourier Transform of a rectangular pulse and apply duality to derive the spectrum of a sinc function.', unit: 2 },
      { text: 'Find the bilateral Laplace transform and ROC of x(t) = e^(-3t)u(t) + e^(2t)u(-t).', unit: 3 },
      { text: 'State and prove the Nyquist Sampling Theorem for band-limited signals and sketch ideal sinc reconstruction.', unit: 4 },
      { text: 'Determine inverse Z-transform of X(z) = 1 / [(1 - 0.5z^-1)(1 - 2z^-1)] for all three possible ROCs.', unit: 5 },
    ],
    secC: [
      { text: 'Test linearity, time-invariance, causality, and stability for y(t) = t * x(t) and y[n] = x[n^2].', unit: 1 },
      { text: 'Derive exponential Fourier series of a periodic square wave and plot magnitude and phase spectra.', unit: 2 },
      { text: 'Solve a second-order LTI differential equation with non-zero initial conditions using unilateral Laplace transform.', unit: 3 },
      { text: 'Analyze flat-top sampling, aperture effect, and anti-aliasing filter requirements for a 4 kHz speech channel.', unit: 4 },
      { text: 'Realize H(z) = (1 + 2z^-1) / (1 - 0.7z^-1 + 0.12z^-2) in Direct Form I, Direct Form II, and cascade form.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-bme501-2025',
    subjectCode: 'BME501',
    title: 'Heat & Mass Transfer — 70-Mark Practice Exam Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original blueprint covering conduction, extended fins, convection correlations, thermal radiation shields, and LMTD/NTU heat exchangers.',
    secA: [
      { text: 'State Fourier law of heat conduction and define thermal diffusivity.', unit: 1 },
      { text: 'What is the Biot number criterion for valid lumped capacitance transient analysis?', unit: 2 },
      { text: 'Define Nusselt, Prandtl, and Grashof numbers.', unit: 3 },
      { text: 'State Stefan-Boltzmann law and Wien displacement law.', unit: 4 },
      { text: 'State Fick first law of binary mass diffusion.', unit: 5 },
      { text: 'Define fin effectiveness and fin efficiency.', unit: 2 },
      { text: 'Why is counter-flow preferred over parallel-flow in heat exchangers?', unit: 5 },
    ],
    secB: [
      { text: 'Derive the critical radius of insulation for a cylinder and evaluate optimum insulation thickness for a steam pipe.', unit: 1 },
      { text: 'Derive temperature distribution and heat dissipation rate for a rectangular fin with insulated tip.', unit: 2 },
      { text: 'Explain hydrodynamic and thermal boundary layers over a flat plate and apply Dittus-Boelter pipe correlation.', unit: 3 },
      { text: 'Derive net radiant heat exchange between two infinite parallel gray plates with N radiation shields.', unit: 4 },
      { text: 'Derive the LMTD expression for a counter-flow double-pipe heat exchanger and compute required area.', unit: 5 },
    ],
    secC: [
      { text: 'Derive general 3D heat conduction equation in cylindrical coordinates and solve steady conduction with internal generation.', unit: 1 },
      { text: 'Analyze transient cooling of a metallic sphere in an oil bath using lumped system analysis and compute time constant.', unit: 2 },
      { text: 'Contrast forced and free convection mechanisms and compute heat loss from a vertical heated plate in still air.', unit: 3 },
      { text: 'Apply view-factor algebra (reciprocity and summation rules) and electrical network analogy to a 3-surface enclosure.', unit: 4 },
      { text: 'Design a shell-and-tube heat exchanger using Effectiveness-NTU method and compare with LMTD iteration.', unit: 5 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-mu-csc302-2025',
    subjectCode: 'CSC302',
    title: 'Data Structures (MU Rev-2019) — Original 70-Mark Practice Blueprint',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Mumbai University B.E. Computer Engineering pattern paper across ADTs, linked lists, AVL/B-Trees, graphs, and hashing.',
    secA: [
      { text: 'Differentiate between linear queue and circular queue overflow conditions.', unit: 1 },
      { text: 'Compare singly linked list and doubly linked list deletion complexity.', unit: 2 },
      { text: 'Define AVL balance factor and list all four rotation cases.', unit: 3 },
      { text: 'Contrast separate chaining and linear probing collision resolution.', unit: 4 },
      { text: 'Convert A + B * C - D / E into postfix notation.', unit: 1 },
      { text: 'State two advantages of B+ Trees over B-Trees in databases.', unit: 3 },
      { text: 'Compare BFS and DFS traversal space complexity.', unit: 4 },
    ],
    secB: [
      { text: 'Write algorithms for infix-to-postfix conversion and postfix expression evaluation using a stack.', unit: 1 },
      { text: 'Implement polynomial addition using singly linked lists and analyze time complexity.', unit: 2 },
      { text: 'Insert keys 30, 20, 40, 10, 25, 35, 50, 5 into an AVL tree showing every rotation.', unit: 3 },
      { text: 'Trace BFS, DFS, and Kahn topological sort on a 6-vertex directed acyclic graph.', unit: 4 },
      { text: 'Insert 8 integer keys into a hash table of size 11 using double hashing and compute probe count.', unit: 4 },
    ],
    secC: [
      { text: 'Design a priority queue ADT and explain circular deque operations with wrap-around indices.', unit: 1 },
      { text: 'Write complete C functions to reverse a singly linked list in-place and detect a cycle.', unit: 2 },
      { text: 'Construct a B-Tree of order 5 for 12 keys and trace a Prefix Trie for dictionary search.', unit: 3 },
      { text: 'Compare adjacency matrix and adjacency list representations for sparse vs dense graphs.', unit: 4 },
      { text: 'Explain rehashing load-factor thresholds and compare quadratic probing vs separate chaining.', unit: 4 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-mu-csc401-2025',
    subjectCode: 'CSC401',
    title: 'Analysis of Algorithms (MU) — Original 70-Mark Practice Blueprint',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Mumbai University practice exam covering recurrences, greedy MST/Knapsack, DP, backtracking, and KMP.',
    secA: [
      { text: 'Solve T(n) = 2T(n/2) + n using the Master Theorem.', unit: 1 },
      { text: 'Why does the greedy strategy fail for 0/1 Knapsack?', unit: 2 },
      { text: 'State the principle of optimality in dynamic programming.', unit: 2 },
      { text: 'Differentiate between backtracking and branch-and-bound pruning.', unit: 3 },
      { text: 'Compute the KMP prefix function for pattern ABABAC.', unit: 3 },
      { text: 'State the worst-case time complexity of Quick Sort and how randomized pivoting mitigates it.', unit: 1 },
      { text: 'Compare Prim and Kruskal MST complexities on sparse graphs.', unit: 2 },
    ],
    secB: [
      { text: 'Derive the recurrence and complexity of Strassen matrix multiplication versus naive O(n^3).', unit: 1 },
      { text: 'Solve a 5-job sequencing with deadlines instance using the greedy method and prove optimality.', unit: 2 },
      { text: 'Compute the Longest Common Subsequence (LCS) DP table for X = AGGTAB and Y = GXTXAYB.', unit: 2 },
      { text: 'Draw the state-space tree for the 4-Queens problem using backtracking.', unit: 3 },
      { text: 'Trace Rabin-Karp string matching with modulo q = 11 and identify spurious hits.', unit: 3 },
    ],
    secC: [
      { text: 'Prove the Omega(n log n) lower bound for comparison-based sorting using decision trees.', unit: 1 },
      { text: 'Trace Floyd-Warshall All-Pairs Shortest Path algorithm on a 4-vertex weighted digraph.', unit: 2 },
      { text: 'Solve a 0/1 Knapsack problem with capacity W = 10 using bottom-up dynamic programming.', unit: 2 },
      { text: 'Solve a 4-city Traveling Salesperson Problem using Least-Cost Branch-and-Bound reduction.', unit: 3 },
      { text: 'Trace KMP matching end-to-end and prove its O(n + m) amortized comparison bound.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-au-cs3301-2025',
    subjectCode: 'CS3301',
    title: 'Data Structures (Anna Univ. R2021) — Original Practice Blueprint',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Anna University R2021 practice paper across lists, stacks, binary heaps, AVL trees, graphs, and hashing.',
    secA: [
      { text: 'Compare array-based list and cursor-based linked list implementations.', unit: 1 },
      { text: 'Write parent and child index formulas for a 1-indexed binary heap.', unit: 2 },
      { text: 'Why is BuildHeap O(n) rather than O(n log n)?', unit: 2 },
      { text: 'Define topological ordering of a directed acyclic graph.', unit: 3 },
      { text: 'Explain load factor and rehashing in open addressing.', unit: 3 },
      { text: 'Differentiate between stack underflow and circular queue full conditions.', unit: 1 },
      { text: 'Compare Merge Sort and Radix Sort time and space complexities.', unit: 3 },
    ],
    secB: [
      { text: 'Design a linked-list ADT supporting insertion, deletion, and polynomial multiplication.', unit: 1 },
      { text: 'Build a Min-Heap from [18, 9, 25, 4, 14, 7, 30] and trace two DeleteMin operations.', unit: 2 },
      { text: 'Trace Dijkstra shortest-path algorithm from source vertex A on a 6-node weighted graph.', unit: 3 },
      { text: 'Insert keys into an AVL tree and demonstrate LR and RL double rotations.', unit: 2 },
      { text: 'Trace Merge Sort and LSD Radix Sort step-by-step on an array of 3-digit numbers.', unit: 3 },
    ],
    secC: [
      { text: 'Explain stack applications in balancing symbols, function call frames, and postfix evaluation.', unit: 1 },
      { text: 'Analyze Binary Search Tree deletion cases (0, 1, and 2 children) and B-Tree node splitting.', unit: 2 },
      { text: 'Compare Prim and Kruskal minimum spanning tree algorithms with disjoint-set path compression.', unit: 3 },
      { text: 'Compare separate chaining, linear probing, quadratic probing, and double hashing.', unit: 3 },
      { text: 'Explain BFS and DFS graph traversals and prove how DFS detects back edges and cycles.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-cbse-m12-2025',
    subjectCode: 'CBSE-M12',
    title: 'CBSE Class 12 Mathematics — Original Board Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Class 12 PCM board-pattern blueprint covering relations, matrices, calculus, vectors, 3D lines, and Bayes probability.',
    secA: [
      { text: 'Show that the relation R = {(a, b) : |a - b| is even} on Z is an equivalence relation.', unit: 1 },
      { text: 'Find the principal value of sin^(-1)(-1/2) + cos^(-1)(-1/2).', unit: 1 },
      { text: 'If A is a 3×3 matrix with |A| = 5, find |adj(A)|.', unit: 2 },
      { text: 'Find dy/dx for y = x^(sin x) using logarithmic differentiation.', unit: 2 },
      { text: 'Write the integrating factor of x dy/dx + 2y = x^2.', unit: 2 },
      { text: 'Find a unit vector perpendicular to both a = i + j + k and b = 2i - j + 3k.', unit: 3 },
      { text: 'State Bayes Theorem for mutually exclusive and exhaustive events.', unit: 3 },
    ],
    secB: [
      { text: 'Solve the system 2x + 3y + 3z = 5, x - 2y + z = -4, 3x - y - 2z = 3 using matrix inverse method.', unit: 2 },
      { text: 'Evaluate integral from 0 to pi/2 of sin^4(x) / [sin^4(x) + cos^4(x)] dx using definite integral properties.', unit: 2 },
      { text: 'Find the area bounded by the parabola y^2 = 4x and the line y = 2x using integration.', unit: 2 },
      { text: 'Find the shortest distance between two skew lines given in vector Cartesian form.', unit: 3 },
      { text: 'Solve a two-factory defective item diagnostic problem using Bayes Theorem.', unit: 3 },
    ],
    secC: [
      { text: 'Prove that f: R -> R defined by f(x) = 4x + 3 is bijective and derive its inverse function.', unit: 1 },
      { text: 'Show that the right circular cylinder of given surface area and maximum volume has height equal to diameter.', unit: 2 },
      { text: 'Solve the homogeneous differential equation (x^2 + xy) dy = (x^2 + y^2) dx.', unit: 2 },
      { text: 'Find the image of point P(1, 6, 3) in the line x/1 = (y - 1)/2 = (z - 2)/3.', unit: 3 },
      { text: 'Formulate and solve a two-variable Linear Programming maximization problem graphically.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-mu-csc501-2025',
    subjectCode: 'CSC501',
    title: 'Operating Systems & Computer Networks (MU) — Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Mumbai University B.E. Sem 5 blueprint across CPU scheduling, Banker algorithm, demand paging, and TCP/IP routing.',
    secA: [
      { text: 'Differentiate between preemptive and non-preemptive CPU scheduling.', unit: 1 },
      { text: 'List the four Coffman conditions necessary for deadlock.', unit: 1 },
      { text: 'Explain Belady anomaly with one concrete page-reference example.', unit: 2 },
      { text: 'Define thrashing and working-set window in virtual memory.', unit: 2 },
      { text: 'Calculate usable host addresses in a /26 IPv4 subnet.', unit: 3 },
      { text: 'Compare distance-vector and link-state routing protocols.', unit: 3 },
      { text: 'Explain the purpose of SYN, SYN-ACK, and ACK in TCP connection setup.', unit: 3 },
    ],
    secB: [
      { text: 'Compute average waiting and turnaround times for 5 processes using SRTF and Round Robin (q=3).', unit: 1 },
      { text: 'Run Banker safety algorithm on a 5-process, 3-resource snapshot and test a new resource request.', unit: 1 },
      { text: 'Count page faults for FIFO, LRU, and Optimal replacement on a 12-page reference string with 3 frames.', unit: 2 },
      { text: 'Design a VLSM subnet plan dividing 192.168.10.0/24 across four departments of sizes 100, 50, 25, and 10.', unit: 3 },
      { text: 'Compare SCAN, C-SCAN, and SSTF disk scheduling on a 200-cylinder disk request queue.', unit: 2 },
    ],
    secC: [
      { text: 'Solve the Bounded-Buffer Producer-Consumer problem using counting and binary semaphores.', unit: 1 },
      { text: 'Explain multi-level paging with TLB lookup and calculate Effective Access Time for 92% TLB hit rate.', unit: 2 },
      { text: 'Explain inode-based Unix file allocation and compute maximum file size for direct and indirect pointers.', unit: 2 },
      { text: 'Trace OSPF link-state database synchronization and shortest-path tree construction.', unit: 3 },
      { text: 'Explain TCP slow start, congestion avoidance, and fast recovery using a cwnd-vs-RTT graph.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-mu-itc601-2025',
    subjectCode: 'ITC601',
    title: 'Database & Distributed Web Engineering (MU) — Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Mumbai University B.E. Sem 6 blueprint covering BCNF normalization, B+ trees, strict 2PL, WAL, and REST/CAP design.',
    secA: [
      { text: 'State the defining condition that distinguishes BCNF from 3NF.', unit: 1 },
      { text: 'Why are B+ Trees preferred over standard binary search trees for disk indexing?', unit: 1 },
      { text: 'Define conflict serializability of a concurrent transaction schedule.', unit: 2 },
      { text: 'Explain the Write-Ahead Logging (WAL) rule.', unit: 2 },
      { text: 'Explain idempotency of HTTP GET, PUT, DELETE, and POST methods.', unit: 3 },
      { text: 'State the CAP theorem trade-off during a network partition.', unit: 3 },
      { text: 'How do parameterized SQL queries prevent SQL injection attacks?', unit: 3 },
    ],
    secB: [
      { text: 'Find all candidate keys and decompose R(A,B,C,D,E) into lossless BCNF relations.', unit: 1 },
      { text: 'Construct a precedence graph to test conflict serializability and recoverability of a 3-transaction schedule.', unit: 2 },
      { text: 'Trace ARIES analysis, redo, and undo phases after a sudden server power failure.', unit: 2 },
      { text: 'Design a versioned REST API schema with HTTP caching (ETag/Cache-Control) for an academic catalog.', unit: 3 },
      { text: 'Compare horizontal sharding vs read-replica scaling for read-heavy vs write-heavy workloads.', unit: 3 },
    ],
    secC: [
      { text: 'Explain relational query optimization steps from SQL parsing to cost-based physical plan selection.', unit: 1 },
      { text: 'Compare Strict 2PL, Timestamp Ordering, and MVCC snapshot isolation on read/write anomalies.', unit: 2 },
      { text: 'Explain checkpointing and shadow paging versus undo/redo log recovery.', unit: 2 },
      { text: 'Architect a horizontally scalable web tier with reverse proxy load balancing, CDN caching, and TLS termination.', unit: 3 },
      { text: 'Analyze OWASP XSS, CSRF, and broken access control threats with concrete server-side mitigations.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-au-cs3401-2025',
    subjectCode: 'CS3401',
    title: 'Algorithms & Operating Systems (AU R2021) — Practice Blueprint (2025)',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Anna University R2021 Sem 4 practice paper across shortest paths, max-flow, NP-completeness, and OS concurrency.',
    secA: [
      { text: 'Compare Bellman-Ford and Dijkstra shortest-path algorithms on negative edge weights.', unit: 1 },
      { text: 'State the Max-Flow Min-Cut theorem.', unit: 1 },
      { text: 'Differentiate between NP-Hard and NP-Complete problem classes.', unit: 2 },
      { text: 'What is a 2-approximation algorithm? Give one example.', unit: 2 },
      { text: 'Distinguish between a binary semaphore and a mutex lock.', unit: 3 },
      { text: 'Explain internal vs external memory fragmentation.', unit: 3 },
      { text: 'Write the condition for a safe state in Banker deadlock avoidance.', unit: 3 },
    ],
    secB: [
      { text: 'Trace Floyd-Warshall all-pairs shortest path algorithm on a 4-vertex directed weighted graph.', unit: 1 },
      { text: 'Find the maximum s-t flow using Ford-Fulkerson augmenting paths and identify the minimum cut.', unit: 1 },
      { text: 'Show how Vertex Cover reduces polynomially to Independent Set.', unit: 2 },
      { text: 'Trace the Readers-Writers synchronization solution avoiding writer starvation.', unit: 3 },
      { text: 'Compute effective memory access time for a 2-level page table with TLB hit rate 95%.', unit: 3 },
    ],
    secC: [
      { text: 'Explain Bellman-Ford edge relaxation proof and demonstrate negative-weight cycle detection.', unit: 1 },
      { text: 'Explain branch-and-bound state-space pruning for the Traveling Salesperson Problem.', unit: 2 },
      { text: 'Present the 2-approximation algorithm for Vertex Cover and prove its approximation ratio.', unit: 2 },
      { text: 'Compare FCFS, SJF, Priority, and Round Robin CPU scheduling on turnaround, waiting, and response metrics.', unit: 3 },
      { text: 'Explain demand paging, copy-on-write fork(), and second-chance clock page replacement.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-au-ec3452-2025',
    subjectCode: 'EC3452',
    title: 'Electromagnetics & Signal Processing (AU R2021) — Practice Blueprint',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Anna University ECE R2021 practice blueprint across Maxwell equations, Smith chart matching, Radix-2 FFT, and digital filters.',
    secA: [
      { text: 'Write Maxwell curl equations in time-harmonic phasor form.', unit: 1 },
      { text: 'Define skin depth in a good conductor and state its frequency dependence.', unit: 1 },
      { text: 'Compute VSWR when load reflection coefficient magnitude is 0.5.', unit: 2 },
      { text: 'Write the characteristic impedance formula for a quarter-wave matching section.', unit: 2 },
      { text: 'Compare linear convolution and circular convolution of two finite sequences.', unit: 3 },
      { text: 'How many complex multiplications are required for an 8-point Radix-2 FFT vs direct DFT?', unit: 3 },
      { text: 'Explain frequency warping in the bilinear transformation method.', unit: 3 },
    ],
    secB: [
      { text: 'Derive the electromagnetic wave equation in a lossless dielectric and find intrinsic impedance.', unit: 1 },
      { text: 'A 50-ohm lossless line terminates in Z_L = 75 + j50 ohm. Find reflection coefficient and VSWR.', unit: 2 },
      { text: 'Design a single-stub shunt tuner using Smith Chart normalization to match a complex load.', unit: 2 },
      { text: 'Compute the 8-point DFT of x[n] = {1, 2, 3, 4, 4, 3, 2, 1} using Radix-2 DIT FFT butterfly diagram.', unit: 3 },
      { text: 'Design a linear-phase low-pass FIR filter of order N=7 using a Hamming window.', unit: 3 },
    ],
    secC: [
      { text: 'State and prove Poynting Theorem for electromagnetic power flow and compute average power density.', unit: 1 },
      { text: 'Analyze oblique incidence of a plane wave on a dielectric interface and derive Brewster angle.', unit: 1 },
      { text: 'Derive voltage and current standing wave expressions along a lossless transmission line.', unit: 2 },
      { text: 'Derive the Decimation-In-Time (DIT) Radix-2 FFT decomposition and draw the complete 8-point signal flow graph.', unit: 3 },
      { text: 'Design a digital Butterworth IIR low-pass filter from analog specifications via bilinear transformation.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-au-cs3591-2025',
    subjectCode: 'CS3591',
    title: 'Computer Networks & Cloud Architecture (AU R2021) — Practice Blueprint',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Anna University Sem 5 practice paper covering ARQ, Ethernet, OSPF routing, TCP congestion, TLS, and cloud virtualization.',
    secA: [
      { text: 'Compare Go-Back-N and Selective Repeat ARQ window size constraints.', unit: 1 },
      { text: 'Why does IEEE 802.3 Ethernet enforce a 64-byte minimum frame length?', unit: 1 },
      { text: 'Explain the count-to-infinity problem in distance-vector routing.', unit: 2 },
      { text: 'Contrast TCP flow control (rwnd) with congestion control (cwnd).', unit: 2 },
      { text: 'Differentiate between recursive and iterative DNS resolution.', unit: 3 },
      { text: 'Compare Type-1 bare-metal hypervisors with OS-level containers.', unit: 3 },
      { text: 'What security properties does the TLS handshake establish?', unit: 3 },
    ],
    secB: [
      { text: 'Compute the CRC-4 remainder for message 1101011011 with generator polynomial x^4 + x + 1.', unit: 1 },
      { text: 'Trace Dijkstra shortest-path computation for OSPF on a 6-router weighted network.', unit: 2 },
      { text: 'Calculate link utilization for Stop-and-Wait vs Go-Back-N (W=7) over a 10 Mbps, 20 ms RTT link.', unit: 1 },
      { text: 'Trace TCP Reno cwnd evolution across Slow Start, Congestion Avoidance, and Triple Duplicate ACK.', unit: 2 },
      { text: 'Compare IaaS, PaaS, and SaaS deployment boundaries using a real web-application stack.', unit: 3 },
    ],
    secC: [
      { text: 'Explain CSMA/CD binary exponential backoff and compare Layer-2 switching with VLAN trunking.', unit: 1 },
      { text: 'Explain IPv4 header fields, fragmentation offset calculation, and IPv6 transition mechanisms.', unit: 2 },
      { text: 'Explain TCP finite-state machine transitions for connection establishment and graceful teardown.', unit: 2 },
      { text: 'Walk through the complete browser request lifecycle: DNS, TCP, TLS 1.3 handshake, and HTTP/2 streams.', unit: 3 },
      { text: 'Explain cloud auto-scaling, container orchestration architecture, and multi-region fault tolerance.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-cbse-p12-2025',
    subjectCode: 'CBSE-P12',
    title: 'CBSE Class 12 Physics — Original 70-Mark Board Practice Blueprint',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Class 12 Physics blueprint covering Gauss law, Kirchhoff circuits, LCR resonance, ray/wave optics, and p-n junctions.',
    secA: [
      { text: 'Define electric flux and write its SI unit.', unit: 1 },
      { text: 'How does drift velocity of electrons vary when conductor temperature increases?', unit: 1 },
      { text: 'Write the expression for magnetic force on a charge q moving with velocity v in field B.', unit: 2 },
      { text: 'Define power factor of an AC circuit and state its value for a pure inductor.', unit: 2 },
      { text: 'Why are coherent sources required for sustained optical interference?', unit: 3 },
      { text: 'State Einstein photoelectric equation and define threshold frequency.', unit: 3 },
      { text: 'Draw the forward and reverse bias V-I characteristic curve of a silicon p-n diode.', unit: 3 },
    ],
    secB: [
      { text: 'Apply Gauss Law to derive electric field due to an infinitely long uniformly charged straight wire.', unit: 1 },
      { text: 'State Kirchhoff laws and derive the balanced condition for a Wheatstone bridge.', unit: 1 },
      { text: 'Derive impedance, phase angle, and resonant frequency of a series LCR AC circuit using a phasor diagram.', unit: 2 },
      { text: 'Derive the Lens Maker Formula for a thin convex lens of refractive index n.', unit: 3 },
      { text: 'Explain full-wave bridge rectification using p-n junction diodes with input/output waveforms.', unit: 3 },
    ],
    secC: [
      { text: 'Derive capacitance of a parallel-plate capacitor partially filled with a dielectric slab of thickness t.', unit: 1 },
      { text: 'Derive force per unit length between two long parallel current-carrying conductors and define 1 Ampere.', unit: 2 },
      { text: 'Explain working principle, turns ratio, and four energy loss sources in a step-up transformer.', unit: 2 },
      { text: 'Derive fringe width in Young Double-Slit Experiment and contrast interference with single-slit diffraction.', unit: 3 },
      { text: 'State Bohr postulates for hydrogen atom and derive radius and energy of the n-th stationary orbit.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-cbse-c12-2025',
    subjectCode: 'CBSE-C12',
    title: 'CBSE Class 12 Chemistry — Original 70-Mark Board Practice Blueprint',
    examYear: 2025,
    examSession: 'Odd Semester',
    authorNote: 'Original Class 12 Chemistry blueprint across colligative properties, Nernst cells, kinetics, CFT, organic conversions, and biomolecules.',
    secA: [
      { text: 'State Raoult Law for a solution containing volatile components.', unit: 1 },
      { text: 'Define molar conductivity and state Kohlrausch law of independent migration.', unit: 1 },
      { text: 'Distinguish between order and molecularity of a chemical reaction.', unit: 1 },
      { text: 'What is lanthanoid contraction? State one consequence.', unit: 2 },
      { text: 'Write the IUPAC name of [Co(NH3)5Cl]Cl2.', unit: 2 },
      { text: 'Why does benzaldehyde undergo Cannizzaro reaction instead of Aldol condensation?', unit: 3 },
      { text: 'Differentiate between fibrous and globular proteins with one example each.', unit: 3 },
    ],
    secB: [
      { text: 'Calculate freezing point depression when 10 g of glucose dissolves in 250 g of water (Kf = 1.86 K kg/mol).', unit: 1 },
      { text: 'Calculate EMF and Delta G0 at 298 K for a Mg/Mg2+ || Cu2+/Cu galvanic cell using the Nernst equation.', unit: 1 },
      { text: 'Show that for a first-order reaction, time required for 99.9% completion is ten times its half-life.', unit: 1 },
      { text: 'Explain octahedral d-orbital splitting in [Fe(CN)6]4- vs [Fe(H2O)6]2+ using Crystal Field Theory.', unit: 2 },
      { text: 'Write chemical equations for Aldol condensation, Rosenmund reduction, and Gabriel phthalimide synthesis.', unit: 3 },
    ],
    secC: [
      { text: 'Explain positive and negative deviations from Raoult law with azeotrope examples and vapor pressure graphs.', unit: 1 },
      { text: 'Derive the integrated rate equation for a first-order reaction and explain Arrhenius activation energy.', unit: 1 },
      { text: 'Explain variable oxidation states, magnetic moment calculations, and color of transition metal ions.', unit: 2 },
      { text: 'Compare SN1 and SN2 nucleophilic substitution mechanisms on kinetics, stereochemistry, and substrate reactivity.', unit: 3 },
      { text: 'Explain chemical reactions establishing open-chain vs cyclic Haworth structure of D-glucose and peptide linkage.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-cbse-cs12-2025',
    subjectCode: 'CBSE-CS12',
    title: 'CBSE Class 12 Computer Science (Python & SQL) — Practice Blueprint',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Class 12 CS blueprint across Python functions, CSV/binary files, LIFO stacks, SQL queries, and networking.',
    secA: [
      { text: 'Differentiate between mutable and immutable built-in Python data types with examples.', unit: 1 },
      { text: 'Compare text files, CSV files, and binary pickle files in Python.', unit: 1 },
      { text: 'Explain the role of try, except, and finally blocks in exception handling.', unit: 1 },
      { text: 'Distinguish between Candidate Key, Primary Key, and Foreign Key in RDBMS.', unit: 2 },
      { text: 'Compare WHERE and HAVING clauses in SQL.', unit: 2 },
      { text: 'Differentiate between a network Hub, Switch, and Router.', unit: 3 },
      { text: 'Explain the difference between HTTP and HTTPS protocols.', unit: 3 },
    ],
    secB: [
      { text: 'Write Python functions to count lines starting with a vowel in a text file and copy matching rows to CSV.', unit: 1 },
      { text: 'Write Push(stack, record) and Pop(stack) Python functions for a student-marks stack with Underflow handling.', unit: 1 },
      { text: 'Write SQL queries using GROUP BY, HAVING, ORDER BY, and Equi-Join on STUDENT and COURSE tables.', unit: 2 },
      { text: 'Write a parameterized Python-MySQL script to insert records and fetch rows above a threshold score.', unit: 2 },
      { text: 'Design a campus LAN topology across four academic blocks recommending cable type, switch, and server placement.', unit: 3 },
    ],
    secC: [
      { text: 'Build a complete binary-file (pickle) CRUD utility in Python supporting append, search, and update.', unit: 1 },
      { text: 'Trace Python scope resolution (LEGB rule), default mutable arguments, and stack evaluation of postfix expressions.', unit: 1 },
      { text: 'Design normalized relational tables and write 7 complex aggregate/join SQL queries with expected output.', unit: 2 },
      { text: 'Compare Star, Bus, and Tree topologies and optical fiber vs twisted-pair vs microwave transmission media.', unit: 3 },
      { text: 'Explain DNS lookup, TCP/IP packet switching, VoIP, and practical cyber-hygiene safeguards.', unit: 3 },
    ],
  }),
  buildStandardBlueprint({
    id: 'pyq-cbse-b12-2025',
    subjectCode: 'CBSE-B12',
    title: 'CBSE Class 12 Biology — Original 70-Mark Board Practice Blueprint',
    examYear: 2025,
    examSession: 'Even Semester',
    authorNote: 'Original Class 12 PCB blueprint across reproduction, molecular genetics, immunology, recombinant DNA PCR, and ecology.',
    secA: [
      { text: 'Define double fertilization and triple fusion in flowering plants.', unit: 1 },
      { text: 'State Mendel Law of Independent Assortment.', unit: 1 },
      { text: 'Why is DNA replication called semi-conservative and semi-discontinuous?', unit: 1 },
      { text: 'Differentiate between active and passive immunity with one example each.', unit: 2 },
      { text: 'What is the role of Taq DNA polymerase in PCR?', unit: 2 },
      { text: 'Write the Verhulst-Pearl logistic population growth equation.', unit: 3 },
      { text: 'Distinguish between in-situ and ex-situ biodiversity conservation.', unit: 3 },
    ],
    secB: [
      { text: 'Trace the structure of an anatropous ovule and explain embryo sac development.', unit: 1 },
      { text: 'Explain the regulation of the lac operon in E. coli in presence and absence of lactose.', unit: 1 },
      { text: 'Sketch an antibody (IgG) molecule and explain cell-mediated vs humoral immune responses.', unit: 2 },
      { text: 'Explain the three thermal steps of Polymerase Chain Reaction (PCR) and gel electrophoresis separation.', unit: 2 },
      { text: 'Explain ecological pyramids of number, biomass, and energy, highlighting why energy pyramids are always upright.', unit: 3 },
    ],
    secC: [
      { text: 'Describe the Meselson and Stahl heavy-nitrogen (15N) experiment proving semi-conservative DNA replication.', unit: 1 },
      { text: 'Explain transcription unit architecture and post-transcriptional splicing, capping, and tailing in eukaryotes.', unit: 1 },
      { text: 'Explain recombinant DNA technology steps from restriction digestion to bioreactor downstream processing.', unit: 2 },
      { text: 'Explain how Bt cotton and RNA interference (RNAi) protect crops from pests using molecular biology.', unit: 2 },
      { text: 'Explain Alexander von Humboldt species-area relationship and the four major causes of biodiversity loss.', unit: 3 },
    ],
  }),
];
