import {
  EXTENDED_BRANCHES,
  EXTENDED_COURSES,
  EXTENDED_NOTES,
  EXTENDED_PYQS,
  EXTENDED_SUBJECTS,
} from './extendedContent';
import { INITIAL_NOTES, INITIAL_PYQS } from './originalContent';
import type { CatalogData } from './types';
import {
  WIDE_BRANCHES,
  WIDE_COURSES,
  WIDE_NOTES,
  WIDE_PYQS,
  WIDE_SUBJECTS,
  WIDE_UNIVERSITIES,
} from './wideCoursesCatalog';

export const INITIAL_CATALOG_DATA: CatalogData = {
  universities: [
    {
      id: 'uni-aktu',
      slug: 'aktu',
      name: 'Dr. A.P.J. Abdul Kalam Technical University',
      shortName: 'AKTU',
      type: 'technical-university',
      state: 'Uttar Pradesh',
      city: 'Lucknow',
      status: 'active',
      description:
        'Primary initial curriculum architecture on StudySphere covering B.Tech semesters 1–8, all 6 core engineering branches, unit-level syllabus trees, original study guides, and 70-mark practice exam blueprints. StudySphere is independent and not affiliated with AKTU.',
      officialDomain: 'aktu.ac.in',
    },
    {
      id: 'uni-mumbai',
      slug: 'mumbai-university',
      name: 'University of Mumbai',
      shortName: 'MU',
      type: 'state-university',
      state: 'Maharashtra',
      city: 'Mumbai',
      status: 'active',
      description:
        'Active B.E. Computer Engineering (Rev-2019 C-Scheme) taxonomy with structured syllabus modules, original study guides, and exam practice blueprints.',
      officialDomain: 'mu.ac.in',
    },
    {
      id: 'uni-anna',
      slug: 'anna-university',
      name: 'Anna University',
      shortName: 'Anna Univ.',
      type: 'technical-university',
      state: 'Tamil Nadu',
      city: 'Chennai',
      status: 'active',
      description:
        'Active B.E. Regulation 2021 curriculum tracks featuring subject codes, unit trees, original revision notes, and practice exam papers.',
      officialDomain: 'annauniv.edu',
    },
    {
      id: 'board-cbse',
      slug: 'cbse',
      name: 'Central Board of Secondary Education',
      shortName: 'CBSE',
      type: 'education-board',
      state: 'National',
      city: 'New Delhi',
      status: 'active',
      description:
        'Active Class 12 PCM Senior Secondary curriculum with chapter-wise syllabi, original formula revision guides, and board exam blueprints.',
      officialDomain: 'cbse.gov.in',
    },
    ...WIDE_UNIVERSITIES,
  ],
  courses: [
    {
      id: 'course-aktu-btech',
      slug: 'btech',
      universityId: 'uni-aktu',
      name: 'Bachelor of Technology',
      shortName: 'B.Tech',
      degreeLevel: 'Undergraduate',
      durationYears: 4,
      totalSemesters: 8,
      description:
        'Four-year Choice Based Credit System (CBCS) undergraduate engineering programme structured across eight semesters, foundational engineering sciences, core branch tracks, and electives.',
    },
    ...EXTENDED_COURSES,
    ...WIDE_COURSES,
  ],
  branches: [
    {
      id: 'br-cse',
      slug: 'cse',
      courseId: 'course-aktu-btech',
      code: 'CSE',
      name: 'Computer Science & Engineering',
      description:
        'Algorithms, systems programming, operating systems, databases, computer networks, compiler design, and software engineering.',
    },
    {
      id: 'br-it',
      slug: 'it',
      courseId: 'course-aktu-btech',
      code: 'IT',
      name: 'Information Technology',
      description:
        'Software architectures, web systems, information security, distributed computing, and enterprise data management.',
    },
    {
      id: 'br-ece',
      slug: 'ece',
      courseId: 'course-aktu-btech',
      code: 'ECE',
      name: 'Electronics & Communication Engineering',
      description:
        'Semiconductor devices, digital logic, signal processing, communication theory, microcontrollers, and VLSI fundamentals.',
    },
    {
      id: 'br-me',
      slug: 'me',
      courseId: 'course-aktu-btech',
      code: 'ME',
      name: 'Mechanical Engineering',
      description:
        'Thermodynamics, fluid mechanics, solid mechanics, manufacturing processes, heat transfer, and machine design.',
    },
    {
      id: 'br-ce',
      slug: 'ce',
      courseId: 'course-aktu-btech',
      code: 'CE',
      name: 'Civil Engineering',
      description:
        'Structural analysis, geotechnical engineering, fluid hydraulics, surveying, and sustainable infrastructure design.',
    },
    {
      id: 'br-ee',
      slug: 'ee',
      courseId: 'course-aktu-btech',
      code: 'EE',
      name: 'Electrical Engineering',
      description:
        'Network theory, electrical machines, power systems, control engineering, and power electronics.',
    },
    ...EXTENDED_BRANCHES,
    ...WIDE_BRANCHES,
  ],
  subjects: [
    {
      id: 'sub-bas103',
      code: 'BAS103',
      name: 'Engineering Mathematics I',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece', 'br-me', 'br-ce', 'br-ee'],
      semester: 1,
      credits: 4,
      category: 'Basic Science',
      summary:
        'Linear algebra, matrix transformations, differential calculus of single and multivariable functions, and vector calculus foundations.',
      units: [
        {
          id: 'u-bas103-1',
          unitNumber: 1,
          title: 'Matrices and Linear Systems',
          topics: [
            { id: 't-bas103-1-1', title: 'Elementary transformations, rank, and normal form' },
            { id: 't-bas103-1-2', title: 'Consistency of linear systems and Cayley-Hamilton theorem' },
            { id: 't-bas103-1-3', title: 'Eigenvalues, eigenvectors, and diagonalization' },
          ],
        },
        {
          id: 'u-bas103-2',
          unitNumber: 2,
          title: 'Differential Calculus I',
          topics: [
            { id: 't-bas103-2-1', title: 'Successive differentiation and Leibnitz theorem' },
            { id: 't-bas103-2-2', title: 'Partial derivatives and Euler theorem for homogeneous functions' },
            { id: 't-bas103-2-3', title: 'Curve tracing for Cartesian and polar coordinates' },
          ],
        },
        {
          id: 'u-bas103-3',
          unitNumber: 3,
          title: 'Differential Calculus II',
          topics: [
            { id: 't-bas103-3-1', title: 'Taylor and Maclaurin series for functions of two variables' },
            { id: 't-bas103-3-2', title: 'Jacobians and functional dependence' },
            { id: 't-bas103-3-3', title: 'Maxima, minima, and Lagrange multipliers' },
          ],
        },
        {
          id: 'u-bas103-4',
          unitNumber: 4,
          title: 'Multiple Integrals',
          topics: [
            { id: 't-bas103-4-1', title: 'Double and triple integrals with change of order' },
            { id: 't-bas103-4-2', title: 'Beta and Gamma functions and Dirichlet integrals' },
            { id: 't-bas103-4-3', title: 'Applications to area and volume calculations' },
          ],
        },
        {
          id: 'u-bas103-5',
          unitNumber: 5,
          title: 'Vector Calculus',
          topics: [
            { id: 't-bas103-5-1', title: 'Gradient, divergence, and curl operators' },
            { id: 't-bas103-5-2', title: 'Line, surface, and volume integrals' },
            { id: 't-bas103-5-3', title: 'Green, Gauss divergence, and Stokes theorems' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs101',
      code: 'BCS101',
      name: 'Programming for Problem Solving',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece', 'br-me', 'br-ce', 'br-ee'],
      semester: 1,
      credits: 3,
      category: 'Engineering Science',
      summary:
        'Algorithmic thinking, structured C programming, control flow, arrays, functions, pointers, and basic file handling.',
      units: [
        {
          id: 'u-bcs101-1',
          unitNumber: 1,
          title: 'Computing Fundamentals and Algorithms',
          topics: [
            { id: 't-bcs101-1-1', title: 'Digital computer architecture, memory hierarchy, and number systems' },
            { id: 't-bcs101-1-2', title: 'Flowcharts, pseudocode, compilation, and execution lifecycle' },
            { id: 't-bcs101-1-3', title: 'Data types, variables, storage classes, and operators in C' },
          ],
        },
        {
          id: 'u-bcs101-2',
          unitNumber: 2,
          title: 'Conditional Branching and Iteration',
          topics: [
            { id: 't-bcs101-2-1', title: 'Precedence rules, type conversion, and conditional statements' },
            { id: 't-bcs101-2-2', title: 'Switch-case constructs and nested decision logic' },
            { id: 't-bcs101-2-3', title: 'Loop constructs, break/continue control, and pattern problems' },
          ],
        },
        {
          id: 'u-bcs101-3',
          unitNumber: 3,
          title: 'Arrays, Strings, and Structures',
          topics: [
            { id: 't-bcs101-3-1', title: 'One-dimensional and multi-dimensional arrays' },
            { id: 't-bcs101-3-2', title: 'Character arrays, string manipulation, and searching/sorting basics' },
            { id: 't-bcs101-3-3', title: 'Structures, unions, enumerations, and arrays of structures' },
          ],
        },
        {
          id: 'u-bcs101-4',
          unitNumber: 4,
          title: 'Functions and Recursion',
          topics: [
            { id: 't-bcs101-4-1', title: 'Function prototypes, parameter passing, and modular decomposition' },
            { id: 't-bcs101-4-2', title: 'Call stack behavior and recursive problem solving' },
            { id: 't-bcs101-4-3', title: 'Passing arrays and structures to functions' },
          ],
        },
        {
          id: 'u-bcs101-5',
          unitNumber: 5,
          title: 'Pointers, Dynamic Memory, and Files',
          topics: [
            { id: 't-bcs101-5-1', title: 'Pointer arithmetic, pointers to arrays, and self-referential structures' },
            { id: 't-bcs101-5-2', title: 'Dynamic allocation with malloc, calloc, realloc, and free' },
            { id: 't-bcs101-5-3', title: 'File I/O modes, command-line arguments, and preprocessor macros' },
          ],
        },
      ],
    },
    {
      id: 'sub-bas203',
      code: 'BAS203',
      name: 'Engineering Mathematics II',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece', 'br-me', 'br-ce', 'br-ee'],
      semester: 2,
      credits: 4,
      category: 'Basic Science',
      summary:
        'Ordinary differential equations, Laplace transforms, infinite series, and complex variable calculus for engineering systems.',
      units: [
        {
          id: 'u-bas203-1',
          unitNumber: 1,
          title: 'Ordinary Differential Equations of Higher Order',
          topics: [
            { id: 't-bas203-1-1', title: 'Linear ODEs with constant coefficients and complementary functions' },
            { id: 't-bas203-1-2', title: 'Cauchy-Euler equations and method of variation of parameters' },
            { id: 't-bas203-1-3', title: 'Simultaneous linear differential equations' },
          ],
        },
        {
          id: 'u-bas203-2',
          unitNumber: 2,
          title: 'Laplace Transforms',
          topics: [
            { id: 't-bas203-2-1', title: 'Existence conditions, shifting theorems, and standard transforms' },
            { id: 't-bas203-2-2', title: 'Inverse Laplace transforms and convolution theorem' },
            { id: 't-bas203-2-3', title: 'Unit step, Dirac delta functions, and solving IVPs' },
          ],
        },
        {
          id: 'u-bas203-3',
          unitNumber: 3,
          title: 'Sequences and Infinite Series',
          topics: [
            { id: 't-bas203-3-1', title: 'Convergence tests: comparison, ratio, root, and Raabe tests' },
            { id: 't-bas203-3-2', title: 'Alternating series and absolute/conditional convergence' },
            { id: 't-bas203-3-3', title: 'Fourier series expansion and half-range series' },
          ],
        },
        {
          id: 'u-bas203-4',
          unitNumber: 4,
          title: 'Complex Variables — Differentiation',
          topics: [
            { id: 't-bas203-4-1', title: 'Analytic functions and Cauchy-Riemann equations' },
            { id: 't-bas203-4-2', title: 'Harmonic conjugates and Milne-Thomson construction' },
            { id: 't-bas203-4-3', title: 'Conformal mappings and bilinear transformations' },
          ],
        },
        {
          id: 'u-bas203-5',
          unitNumber: 5,
          title: 'Complex Variables — Integration',
          topics: [
            { id: 't-bas203-5-1', title: 'Complex line integrals and Cauchy integral theorem/formula' },
            { id: 't-bas203-5-2', title: 'Taylor and Laurent series expansions and singularities' },
            { id: 't-bas203-5-3', title: 'Cauchy residue theorem and real definite integral evaluation' },
          ],
        },
      ],
    },
    {
      id: 'sub-bee101',
      code: 'BEE101',
      name: 'Fundamentals of Electrical Engineering',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece', 'br-me', 'br-ce', 'br-ee'],
      semester: 2,
      credits: 3,
      category: 'Engineering Science',
      summary:
        'DC network theorems, single-phase and three-phase AC circuits, magnetic transformers, rotating machines, and electrical installations.',
      units: [
        {
          id: 'u-bee101-1',
          unitNumber: 1,
          title: 'DC Circuits and Network Theorems',
          topics: [
            { id: 't-bee101-1-1', title: 'Kirchhoff laws, mesh analysis, and nodal analysis' },
            { id: 't-bee101-1-2', title: 'Superposition, Thevenin, and Norton equivalents' },
            { id: 't-bee101-1-3', title: 'Maximum power transfer and star-delta conversion' },
          ],
        },
        {
          id: 'u-bee101-2',
          unitNumber: 2,
          title: 'Steady-State AC Circuits',
          topics: [
            { id: 't-bee101-2-1', title: 'Phasor representation, RMS/average values, and power factor' },
            { id: 't-bee101-2-2', title: 'Series and parallel RLC circuits and resonance' },
            { id: 't-bee101-2-3', title: 'Balanced three-phase star and delta systems' },
          ],
        },
        {
          id: 'u-bee101-3',
          unitNumber: 3,
          title: 'Single-Phase Transformers',
          topics: [
            { id: 't-bee101-3-1', title: 'Magnetic circuits, Faraday law, and EMF equation' },
            { id: 't-bee101-3-2', title: 'Equivalent circuit, losses, efficiency, and voltage regulation' },
            { id: 't-bee101-3-3', title: 'Introduction to auto-transformers' },
          ],
        },
        {
          id: 'u-bee101-4',
          unitNumber: 4,
          title: 'Electrical Machines',
          topics: [
            { id: 't-bee101-4-1', title: 'Construction and operating principles of DC motors and generators' },
            { id: 't-bee101-4-2', title: 'Three-phase induction motor torque-slip characteristics' },
            { id: 't-bee101-4-3', title: 'Single-phase induction and synchronous machine overview' },
          ],
        },
        {
          id: 'u-bee101-5',
          unitNumber: 5,
          title: 'Electrical Installations and Safety',
          topics: [
            { id: 't-bee101-5-1', title: 'Protective switchgear: fuses, MCB, MCCB, and ELCB' },
            { id: 't-bee101-5-2', title: 'Earthing methods, cable sizing, and energy tariff basics' },
            { id: 't-bee101-5-3', title: 'Battery types and elementary power backup systems' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs301',
      code: 'BCS301',
      name: 'Data Structures',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 3,
      credits: 4,
      category: 'Core',
      summary:
        'Asymptotic analysis, linear structures, stacks, queues, linked representations, trees, graphs, searching, hashing, and sorting.',
      units: [
        {
          id: 'u-bcs301-1',
          unitNumber: 1,
          title: 'Algorithm Complexity and Linked Lists',
          topics: [
            { id: 't-bcs301-1-1', title: 'Time-space trade-offs and asymptotic notations (Big-O, Omega, Theta)' },
            { id: 't-bcs301-1-2', title: 'Array address calculation and sparse matrix representations' },
            { id: 't-bcs301-1-3', title: 'Singly, doubly, and circular linked lists with polynomial applications' },
          ],
        },
        {
          id: 'u-bcs301-2',
          unitNumber: 2,
          title: 'Stacks, Recursion, and Queues',
          topics: [
            { id: 't-bcs301-2-1', title: 'Stack ADT, infix-postfix conversion, and expression evaluation' },
            { id: 't-bcs301-2-2', title: 'Recursion mechanics, tail recursion, and Tower of Hanoi' },
            { id: 't-bcs301-2-3', title: 'Linear queues, circular queues, priority queues, and deques' },
          ],
        },
        {
          id: 'u-bcs301-3',
          unitNumber: 3,
          title: 'Searching, Hashing, and Sorting',
          topics: [
            { id: 't-bcs301-3-1', title: 'Linear search, binary search, and hash collision resolution' },
            { id: 't-bcs301-3-2', title: 'Insertion, selection, bubble, shell, and radix sort' },
            { id: 't-bcs301-3-3', title: 'Divide-and-conquer sorting: merge sort, quick sort, and heap sort' },
          ],
        },
        {
          id: 'u-bcs301-4',
          unitNumber: 4,
          title: 'Graphs and Shortest Paths',
          topics: [
            { id: 't-bcs301-4-1', title: 'Adjacency matrix, adjacency list, BFS, and DFS traversals' },
            { id: 't-bcs301-4-2', title: 'Minimum spanning trees: Prim and Kruskal algorithms' },
            { id: 't-bcs301-4-3', title: 'Shortest paths: Dijkstra and Floyd-Warshall algorithms' },
          ],
        },
        {
          id: 'u-bcs301-5',
          unitNumber: 5,
          title: 'Trees and Balanced Search Structures',
          topics: [
            { id: 't-bcs301-5-1', title: 'Binary trees, recursive/iterative traversals, and threaded binary trees' },
            { id: 't-bcs301-5-2', title: 'Binary search trees, AVL rotations, and Huffman coding' },
            { id: 't-bcs301-5-3', title: 'Multi-way search trees: B-Trees and B+ Trees' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs302',
      code: 'BCS302',
      name: 'Computer Organization and Architecture',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 3,
      credits: 4,
      category: 'Core',
      summary:
        'Bus structures, fixed/floating-point arithmetic, control unit design, memory hierarchy, cache mapping, and I/O interfaces.',
      units: [
        {
          id: 'u-bcs302-1',
          unitNumber: 1,
          title: 'Functional Units and Bus Architecture',
          topics: [
            { id: 't-bcs302-1-1', title: 'Processor organization, register transfer language, and bus arbitration' },
            { id: 't-bcs302-1-2', title: 'Addressing modes and instruction set design principles' },
            { id: 't-bcs302-1-3', title: 'Stack-organized and general register CPU models' },
          ],
        },
        {
          id: 'u-bcs302-2',
          unitNumber: 2,
          title: 'Computer Arithmetic and ALU Design',
          topics: [
            { id: 't-bcs302-2-1', title: 'Carry look-ahead adders and signed binary arithmetic' },
            { id: 't-bcs302-2-2', title: 'Booth multiplication and restoring/non-restoring division' },
            { id: 't-bcs302-2-3', title: 'IEEE 754 floating-point representation and operations' },
          ],
        },
        {
          id: 'u-bcs302-3',
          unitNumber: 3,
          title: 'Control Unit and Pipelining',
          topics: [
            { id: 't-bcs302-3-1', title: 'Instruction fetch-decode-execute cycle and micro-operations' },
            { id: 't-bcs302-3-2', title: 'Hardwired control versus microprogrammed control units' },
            { id: 't-bcs302-3-3', title: 'Instruction pipelining stages, hazards, and RISC/CISC traits' },
          ],
        },
        {
          id: 'u-bcs302-4',
          unitNumber: 4,
          title: 'Memory Hierarchy and Cache Systems',
          topics: [
            { id: 't-bcs302-4-1', title: 'RAM/ROM organization, memory interleaving, and 2D/2.5D decoding' },
            { id: 't-bcs302-4-2', title: 'Cache mapping policies, replacement algorithms, and write policies' },
            { id: 't-bcs302-4-3', title: 'Virtual memory, paging, segmentation, and TLB operation' },
          ],
        },
        {
          id: 'u-bcs302-5',
          unitNumber: 5,
          title: 'Input/Output Organization',
          topics: [
            { id: 't-bcs302-5-1', title: 'Programmed I/O, interrupt-driven I/O, and priority interrupts' },
            { id: 't-bcs302-5-2', title: 'Direct Memory Access (DMA) controllers and transfer modes' },
            { id: 't-bcs302-5-3', title: 'Serial communication protocols and standard peripheral interfaces' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs303',
      code: 'BCS303',
      name: 'Discrete Structures and Theory of Logic',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 3,
      credits: 3,
      category: 'Core',
      summary:
        'Set theory, relations, posets, lattices, propositional and predicate logic, algebraic groups, combinatorics, and recurrence relations.',
      units: [
        {
          id: 'u-bcs303-1',
          unitNumber: 1,
          title: 'Set Theory, Relations, and Functions',
          topics: [
            { id: 't-bcs303-1-1', title: 'Set operations, mathematical induction, and equivalence relations' },
            { id: 't-bcs303-1-2', title: 'Partial orders, Hasse diagrams, and composition of functions' },
            { id: 't-bcs303-1-3', title: 'Growth of functions and countable sets' },
          ],
        },
        {
          id: 'u-bcs303-2',
          unitNumber: 2,
          title: 'Algebraic Structures',
          topics: [
            { id: 't-bcs303-2-1', title: 'Semigroups, monoids, groups, and subgroups' },
            { id: 't-bcs303-2-2', title: 'Cosets, Lagrange theorem, and cyclic/abelian groups' },
            { id: 't-bcs303-2-3', title: 'Rings, integral domains, and finite fields' },
          ],
        },
        {
          id: 'u-bcs303-3',
          unitNumber: 3,
          title: 'Lattices and Boolean Algebra',
          topics: [
            { id: 't-bcs303-3-1', title: 'Bounded, distributive, and complemented lattices' },
            { id: 't-bcs303-3-2', title: 'Boolean identities, canonical forms, and Karnaugh map minimization' },
            { id: 't-bcs303-3-3', title: 'Switching circuits and logic gate synthesis' },
          ],
        },
        {
          id: 'u-bcs303-4',
          unitNumber: 4,
          title: 'Propositional and Predicate Logic',
          topics: [
            { id: 't-bcs303-4-1', title: 'Logical connectives, tautologies, normal forms, and inference rules' },
            { id: 't-bcs303-4-2', title: 'First-order quantifiers and predicate proof derivations' },
            { id: 't-bcs303-4-3', title: 'Resolution refutation and soundness/completeness concepts' },
          ],
        },
        {
          id: 'u-bcs303-5',
          unitNumber: 5,
          title: 'Combinatorics, Recurrences, and Graphs',
          topics: [
            { id: 't-bcs303-5-1', title: 'Pigeonhole principle, permutations, and generating functions' },
            { id: 't-bcs303-5-2', title: 'Solving linear recurrence relations' },
            { id: 't-bcs303-5-3', title: 'Eulerian/Hamiltonian paths, planar graphs, and chromatic number' },
          ],
        },
      ],
    },
    {
      id: 'sub-bec301',
      code: 'BEC301',
      name: 'Electronic Devices',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-ece', 'br-ee'],
      semester: 3,
      credits: 4,
      category: 'Core',
      summary:
        'Semiconductor physics, carrier transport, p-n junction diodes, bipolar junction transistors, MOSFET characteristics, and optoelectronic devices.',
      units: [
        {
          id: 'u-bec301-1',
          unitNumber: 1,
          title: 'Semiconductor Physics and Energy Bands',
          topics: [
            { id: 't-bec301-1-1', title: 'Crystal lattices, energy bands, and intrinsic/extrinsic carriers' },
            { id: 't-bec301-1-2', title: 'Fermi-Dirac statistics and carrier concentration equilibrium' },
          ],
        },
        {
          id: 'u-bec301-2',
          unitNumber: 2,
          title: 'Carrier Transport Phenomena',
          topics: [
            { id: 't-bec301-2-1', title: 'Drift, diffusion, Einstein relation, and Hall effect' },
            { id: 't-bec301-2-2', title: 'Continuity equations and carrier recombination lifetimes' },
          ],
        },
        {
          id: 'u-bec301-3',
          unitNumber: 3,
          title: 'P-N Junction Diodes',
          topics: [
            { id: 't-bec301-3-1', title: 'Depletion region electrostatics, forward/reverse I-V curve' },
            { id: 't-bec301-3-2', title: 'Zener breakdown, avalanche effect, and junction capacitances' },
          ],
        },
        {
          id: 'u-bec301-4',
          unitNumber: 4,
          title: 'Bipolar Junction Transistors',
          topics: [
            { id: 't-bec301-4-1', title: 'BJT operating regions, current components, and Ebers-Moll model' },
            { id: 't-bec301-4-2', title: 'Early effect, small-signal hybrid-pi parameters, and switching' },
          ],
        },
        {
          id: 'u-bec301-5',
          unitNumber: 5,
          title: 'MOSFETs and Optoelectronics',
          topics: [
            { id: 't-bec301-5-1', title: 'MOS capacitor C-V curves, threshold voltage, and channel modulation' },
            { id: 't-bec301-5-2', title: 'Photodiodes, solar cells, and light-emitting diodes' },
          ],
        },
      ],
    },
    {
      id: 'sub-bme301',
      code: 'BME301',
      name: 'Thermodynamics',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-me'],
      semester: 3,
      credits: 4,
      category: 'Core',
      summary:
        'Zeroth, first, and second laws of thermodynamics, entropy, exergy analysis, pure substance properties, and vapor/gas power cycles.',
      units: [
        {
          id: 'u-bme301-1',
          unitNumber: 1,
          title: 'Fundamental Concepts and First Law',
          topics: [
            { id: 't-bme301-1-1', title: 'Thermodynamic systems, state equilibrium, and Zeroth law' },
            { id: 't-bme301-1-2', title: 'First law for closed systems and steady-flow energy equation' },
          ],
        },
        {
          id: 'u-bme301-2',
          unitNumber: 2,
          title: 'Second Law and Entropy',
          topics: [
            { id: 't-bme301-2-1', title: 'Kelvin-Planck and Clausius statements, Carnot cycle' },
            { id: 't-bme301-2-2', title: 'Clausius inequality, entropy generation, and availability' },
          ],
        },
        {
          id: 'u-bme301-3',
          unitNumber: 3,
          title: 'Properties of Pure Substances',
          topics: [
            { id: 't-bme301-3-1', title: 'Phase change diagrams (P-v, T-s, h-s) and dryness fraction' },
            { id: 't-bme301-3-2', title: 'Steam tables, Mollier charts, and throttling calorimeters' },
          ],
        },
        {
          id: 'u-bme301-4',
          unitNumber: 4,
          title: 'Vapor Power and Refrigeration Cycles',
          topics: [
            { id: 't-bme301-4-1', title: 'Rankine cycle with reheat and regenerative feedwater heating' },
            { id: 't-bme301-4-2', title: 'Vapor compression refrigeration cycle and COP analysis' },
          ],
        },
        {
          id: 'u-bme301-5',
          unitNumber: 5,
          title: 'Gas Power Cycles and Thermodynamic Relations',
          topics: [
            { id: 't-bme301-5-1', title: 'Otto, Diesel, Dual, and Brayton air-standard cycles' },
            { id: 't-bme301-5-2', title: 'Maxwell relations, Clapeyron equation, and Joule-Thomson coefficient' },
          ],
        },
      ],
    },
    {
      id: 'sub-bce301',
      code: 'BCE301',
      name: 'Engineering Mechanics',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-ce', 'br-me'],
      semester: 3,
      credits: 4,
      category: 'Core',
      summary:
        'Equilibrium of rigid bodies, truss analysis, friction, centroids, moments of inertia, shear/bending diagrams, and particle kinematics.',
      units: [
        {
          id: 'u-bce301-1',
          unitNumber: 1,
          title: 'Force Systems and Equilibrium',
          topics: [
            { id: 't-bce301-1-1', title: 'Coplanar and spatial force systems, moments, and couples' },
            { id: 't-bce301-1-2', title: 'Free-body diagrams and static equilibrium equations' },
          ],
        },
        {
          id: 'u-bce301-2',
          unitNumber: 2,
          title: 'Trusses, Frames, and Friction',
          topics: [
            { id: 't-bce301-2-1', title: 'Method of joints and method of sections for determinate trusses' },
            { id: 't-bce301-2-2', title: 'Dry Coulomb friction, wedges, ladders, and belt friction' },
          ],
        },
        {
          id: 'u-bce301-3',
          unitNumber: 3,
          title: 'Centroids and Moments of Inertia',
          topics: [
            { id: 't-bce301-3-1', title: 'Centroids of composite areas and Pappus-Guldinus theorems' },
            { id: 't-bce301-3-2', title: 'Parallel axis theorem, product of inertia, and principal axes' },
          ],
        },
        {
          id: 'u-bce301-4',
          unitNumber: 4,
          title: 'Beams and Virtual Work',
          topics: [
            { id: 't-bce301-4-1', title: 'Shear force and bending moment diagrams for determinate beams' },
            { id: 't-bce301-4-2', title: 'Principle of virtual work for connected systems' },
          ],
        },
        {
          id: 'u-bce301-5',
          unitNumber: 5,
          title: 'Kinematics and Kinetics of Rigid Bodies',
          topics: [
            { id: 't-bce301-5-1', title: 'Rectilinear, curvilinear, and plane motion of rigid bodies' },
            { id: 't-bce301-5-2', title: 'Work-energy and impulse-momentum methods' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs401',
      code: 'BCS401',
      name: 'Operating Systems',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 4,
      credits: 4,
      category: 'Core',
      summary:
        'Process management, CPU scheduling, concurrency, synchronization, deadlocks, memory management, virtual paging, and file systems.',
      units: [
        {
          id: 'u-bcs401-1',
          unitNumber: 1,
          title: 'OS Architecture and Process Abstractions',
          topics: [
            { id: 't-bcs401-1-1', title: 'Kernel architectures, system calls, and dual-mode execution' },
            { id: 't-bcs401-1-2', title: 'Process states, PCB, context switching, and multithreading models' },
          ],
        },
        {
          id: 'u-bcs401-2',
          unitNumber: 2,
          title: 'Concurrency and Synchronization',
          topics: [
            { id: 't-bcs401-2-1', title: 'Critical section problem, Peterson solution, and mutex locks' },
            { id: 't-bcs401-2-2', title: 'Semaphores, monitors, and classic synchronization problems' },
          ],
        },
        {
          id: 'u-bcs401-3',
          unitNumber: 3,
          title: 'CPU Scheduling and Deadlocks',
          topics: [
            { id: 't-bcs401-3-1', title: 'FCFS, SJF, SRTF, priority, round-robin, and multilevel queues' },
            { id: 't-bcs401-3-2', title: 'Deadlock characterization, Banker algorithm, detection, and recovery' },
          ],
        },
        {
          id: 'u-bcs401-4',
          unitNumber: 4,
          title: 'Memory and Virtual Memory Management',
          topics: [
            { id: 't-bcs401-4-1', title: 'Contiguous allocation, paging, segmentation, and page tables' },
            { id: 't-bcs401-4-2', title: 'Demand paging, LRU/Optimal/FIFO replacement, and thrashing' },
          ],
        },
        {
          id: 'u-bcs401-5',
          unitNumber: 5,
          title: 'Storage, Disk Scheduling, and File Systems',
          topics: [
            { id: 't-bcs401-5-1', title: 'Directory structures, allocation methods, and inode design' },
            { id: 't-bcs401-5-2', title: 'Disk scheduling (SSTF, SCAN, C-SCAN) and RAID fundamentals' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs402',
      code: 'BCS402',
      name: 'Theory of Automata and Formal Languages',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 4,
      credits: 4,
      category: 'Core',
      summary:
        'Finite automata, regular languages, context-free grammars, pushdown automata, Turing machines, and decidability limits.',
      units: [
        {
          id: 'u-bcs402-1',
          unitNumber: 1,
          title: 'Finite Automata',
          topics: [
            { id: 't-bcs402-1-1', title: 'DFA, NFA, epsilon-NFA equivalence, and DFA minimization' },
            { id: 't-bcs402-1-2', title: 'Mealy and Moore finite-state transducers' },
          ],
        },
        {
          id: 'u-bcs402-2',
          unitNumber: 2,
          title: 'Regular Expressions and Languages',
          topics: [
            { id: 't-bcs402-2-1', title: 'Arden theorem, Kleene theorem, and closure properties' },
            { id: 't-bcs402-2-2', title: 'Pumping lemma for regular languages and Myhill-Nerode theorem' },
          ],
        },
        {
          id: 'u-bcs402-3',
          unitNumber: 3,
          title: 'Context-Free Grammars',
          topics: [
            { id: 't-bcs402-3-1', title: 'Derivations, parse trees, ambiguity, and simplification' },
            { id: 't-bcs402-3-2', title: 'Chomsky Normal Form (CNF) and Greibach Normal Form (GNF)' },
          ],
        },
        {
          id: 'u-bcs402-4',
          unitNumber: 4,
          title: 'Pushdown Automata',
          topics: [
            { id: 't-bcs402-4-1', title: 'Acceptance by final state and empty stack, equivalence to CFG' },
            { id: 't-bcs402-4-2', title: 'Deterministic vs non-deterministic PDA and CFL pumping lemma' },
          ],
        },
        {
          id: 'u-bcs402-5',
          unitNumber: 5,
          title: 'Turing Machines and Decidability',
          topics: [
            { id: 't-bcs402-5-1', title: 'Standard and multi-tape Turing machines, Church-Turing thesis' },
            { id: 't-bcs402-5-2', title: 'Halting problem, Post Correspondence Problem, and Chomsky hierarchy' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs501',
      code: 'BCS501',
      name: 'Database Management System',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 5,
      credits: 4,
      category: 'Core',
      summary:
        'ER modeling, relational algebra, SQL querying, normalization theory, transaction ACID guarantees, concurrency control, and crash recovery.',
      units: [
        {
          id: 'u-bcs501-1',
          unitNumber: 1,
          title: 'Data Modeling and ER Design',
          topics: [
            { id: 't-bcs501-1-1', title: 'Three-schema architecture, data independence, and ER/EER diagrams' },
            { id: 't-bcs501-1-2', title: 'Keys, cardinality constraints, and mapping ER models to relations' },
          ],
        },
        {
          id: 'u-bcs501-2',
          unitNumber: 2,
          title: 'Relational Algebra and SQL',
          topics: [
            { id: 't-bcs501-2-1', title: 'Selection, projection, joins, division, and tuple relational calculus' },
            { id: 't-bcs501-2-2', title: 'SQL DDL/DML, nested subqueries, views, triggers, and cursors' },
          ],
        },
        {
          id: 'u-bcs501-3',
          unitNumber: 3,
          title: 'Schema Refinement and Normalization',
          topics: [
            { id: 't-bcs501-3-1', title: 'Functional dependencies, Armstrong axioms, and canonical covers' },
            { id: 't-bcs501-3-2', title: '1NF, 2NF, 3NF, BCNF, lossless joins, and dependency preservation' },
          ],
        },
        {
          id: 'u-bcs501-4',
          unitNumber: 4,
          title: 'Transaction Processing and Serializability',
          topics: [
            { id: 't-bcs501-4-1', title: 'ACID properties, conflict and view serializability, precedence graphs' },
            { id: 't-bcs501-4-2', title: 'Recoverable and cascadeless schedules' },
          ],
        },
        {
          id: 'u-bcs501-5',
          unitNumber: 5,
          title: 'Concurrency Control and Recovery',
          topics: [
            { id: 't-bcs501-5-1', title: 'Two-phase locking (2PL), timestamp ordering, and MVCC' },
            { id: 't-bcs501-5-2', title: 'Write-ahead logging, checkpoints, and ARIES recovery concepts' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs503',
      code: 'BCS503',
      name: 'Design and Analysis of Algorithms',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 5,
      credits: 4,
      category: 'Core',
      summary:
        'Recurrence solving, advanced data structures, greedy strategy, dynamic programming, backtracking, string matching, and NP-completeness.',
      units: [
        {
          id: 'u-bcs503-1',
          unitNumber: 1,
          title: 'Asymptotic Analysis and Recurrences',
          topics: [
            { id: 't-bcs503-1-1', title: 'Substitution, recursion tree, and Master theorem bounds' },
            { id: 't-bcs503-1-2', title: 'Linear-time sorting: counting sort, radix sort, and bucket sort' },
          ],
        },
        {
          id: 'u-bcs503-2',
          unitNumber: 2,
          title: 'Advanced Tree and Heap Structures',
          topics: [
            { id: 't-bcs503-2-1', title: 'Red-Black trees, B-Trees, and amortized analysis' },
            { id: 't-bcs503-2-2', title: 'Binomial heaps, Fibonacci heaps, and disjoint-set union' },
          ],
        },
        {
          id: 'u-bcs503-3',
          unitNumber: 3,
          title: 'Divide-and-Conquer and Greedy Algorithms',
          topics: [
            { id: 't-bcs503-3-1', title: 'Strassen matrix multiplication and convex hull algorithms' },
            { id: 't-bcs503-3-2', title: 'Activity selection, fractional knapsack, and optimal merge patterns' },
          ],
        },
        {
          id: 'u-bcs503-4',
          unitNumber: 4,
          title: 'Dynamic Programming and Backtracking',
          topics: [
            { id: 't-bcs503-4-1', title: 'Matrix chain multiplication, LCS, 0/1 knapsack, and Bellman-Ford' },
            { id: 't-bcs503-4-2', title: 'N-Queens, graph coloring, subset sum, and branch-and-bound TSP' },
          ],
        },
        {
          id: 'u-bcs503-5',
          unitNumber: 5,
          title: 'String Matching and NP-Completeness',
          topics: [
            { id: 't-bcs503-5-1', title: 'Rabin-Karp, Knuth-Morris-Pratt (KMP), and finite automaton matchers' },
            { id: 't-bcs503-5-2', title: 'P, NP, polynomial reductions, SAT, clique, and approximation schemes' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs601',
      code: 'BCS601',
      name: 'Software Engineering',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 6,
      credits: 4,
      category: 'Core',
      summary:
        'SDLC models, requirements engineering, architectural design, software testing strategies, COCOMO estimation, and maintenance governance.',
      units: [
        {
          id: 'u-bcs601-1',
          unitNumber: 1,
          title: 'Software Process Models',
          topics: [
            { id: 't-bcs601-1-1', title: 'Waterfall, iterative, spiral, prototyping, and Agile/Scrum workflows' },
            { id: 't-bcs601-1-2', title: 'Software quality attributes and process maturity frameworks' },
          ],
        },
        {
          id: 'u-bcs601-2',
          unitNumber: 2,
          title: 'Requirements Engineering',
          topics: [
            { id: 't-bcs601-2-1', title: 'Elicitation techniques, SRS IEEE standards, and feasibility analysis' },
            { id: 't-bcs601-2-2', title: 'Data flow diagrams, use-case modeling, and validation' },
          ],
        },
        {
          id: 'u-bcs601-3',
          unitNumber: 3,
          title: 'Software Design and Metrics',
          topics: [
            { id: 't-bcs601-3-1', title: 'Cohesion, coupling, modular architecture, and UML diagrams' },
            { id: 't-bcs601-3-2', title: 'Halstead complexity, function points, and cyclomatic complexity' },
          ],
        },
        {
          id: 'u-bcs601-4',
          unitNumber: 4,
          title: 'Verification, Validation, and Testing',
          topics: [
            { id: 't-bcs601-4-1', title: 'Boundary value analysis, equivalence partitioning, and path testing' },
            { id: 't-bcs601-4-2', title: 'Unit, integration, system, regression, and acceptance testing' },
          ],
        },
        {
          id: 'u-bcs601-5',
          unitNumber: 5,
          title: 'Maintenance and Project Management',
          topics: [
            { id: 't-bcs601-5-1', title: 'COCOMO cost estimation, risk planning, and version control' },
            { id: 't-bcs601-5-2', title: 'Corrective, adaptive, perfective maintenance, and re-engineering' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs603',
      code: 'BCS603',
      name: 'Computer Networks',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece'],
      semester: 6,
      credits: 4,
      category: 'Core',
      summary:
        'Layered protocol stacks, data link error/flow control, IPv4/IPv6 routing, TCP congestion control, and application-layer internet protocols.',
      units: [
        {
          id: 'u-bcs603-1',
          unitNumber: 1,
          title: 'Network Architecture and Physical Layer',
          topics: [
            { id: 't-bcs603-1-1', title: 'OSI and TCP/IP reference models, topologies, and transmission media' },
            { id: 't-bcs603-1-2', title: 'Switching techniques, multiplexing, and Nyquist/Shannon limits' },
          ],
        },
        {
          id: 'u-bcs603-2',
          unitNumber: 2,
          title: 'Data Link Layer and MAC Protocols',
          topics: [
            { id: 't-bcs603-2-1', title: 'Framing, CRC error detection, Hamming codes, and sliding window ARQ' },
            { id: 't-bcs603-2-2', title: 'ALOHA, CSMA/CD, CSMA/CA, Ethernet standards, and VLAN switching' },
          ],
        },
        {
          id: 'u-bcs603-3',
          unitNumber: 3,
          title: 'Network Layer and Routing',
          topics: [
            { id: 't-bcs603-3-1', title: 'IPv4 subnetting, CIDR, NAT, ICMP, ARP, and IPv6 header layout' },
            { id: 't-bcs603-3-2', title: 'Distance-vector (RIP), link-state (OSPF), and path-vector (BGP)' },
          ],
        },
        {
          id: 'u-bcs603-4',
          unitNumber: 4,
          title: 'Transport Layer Protocols',
          topics: [
            { id: 't-bcs603-4-1', title: 'UDP datagrams, TCP three-way handshake, and flow control windows' },
            { id: 't-bcs603-4-2', title: 'Congestion control (slow start, AIMD), leaky/token bucket QoS' },
          ],
        },
        {
          id: 'u-bcs603-5',
          unitNumber: 5,
          title: 'Application Layer and Network Security Basics',
          topics: [
            { id: 't-bcs603-5-1', title: 'DNS resolution, HTTP/HTTPS, SMTP, IMAP, and FTP mechanics' },
            { id: 't-bcs603-5-2', title: 'TLS handshake overview, digital certificates, and firewalls' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs701',
      code: 'BCS701',
      name: 'Distributed Systems and Cloud Fundamentals',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it'],
      semester: 7,
      credits: 3,
      category: 'Elective',
      summary:
        'Logical clocks, consensus, replication, fault tolerance, distributed file systems, and cloud-native service architectures.',
      units: [
        {
          id: 'u-bcs701-1',
          unitNumber: 1,
          title: 'Distributed Architecture Models',
          topics: [
            { id: 't-bcs701-1-1', title: 'System models, RPC, message queues, and transparency goals' },
            { id: 't-bcs701-1-2', title: 'Lamport logical clocks, vector clocks, and global snapshots' },
          ],
        },
        {
          id: 'u-bcs701-2',
          unitNumber: 2,
          title: 'Coordination and Mutual Exclusion',
          topics: [
            { id: 't-bcs701-2-1', title: 'Ricart-Agrawala, token ring, and Bully/Ring leader election' },
            { id: 't-bcs701-2-2', title: 'Distributed deadlock detection strategies' },
          ],
        },
        {
          id: 'u-bcs701-3',
          unitNumber: 3,
          title: 'Replication and Consistency',
          topics: [
            { id: 't-bcs701-3-1', title: 'Linearizability, sequential consistency, and eventual consistency' },
            { id: 't-bcs701-3-2', title: 'Two-phase commit, Paxos, and Raft consensus overview' },
          ],
        },
        {
          id: 'u-bcs701-4',
          unitNumber: 4,
          title: 'Fault Tolerance and Recovery',
          topics: [
            { id: 't-bcs701-4-1', title: 'Failure models, checkpointing, and message logging' },
            { id: 't-bcs701-4-2', title: 'Byzantine fault tolerance principles' },
          ],
        },
        {
          id: 'u-bcs701-5',
          unitNumber: 5,
          title: 'Distributed Storage and Cloud Deployment',
          topics: [
            { id: 't-bcs701-5-1', title: 'Partitioning, consistent hashing, and distributed file systems' },
            { id: 't-bcs701-5-2', title: 'Virtualization, containers, and edge compute fundamentals' },
          ],
        },
      ],
    },
    {
      id: 'sub-bcs801',
      code: 'BCS801',
      name: 'Capstone Engineering Design and Ethics',
      universityId: 'uni-aktu',
      courseId: 'course-aktu-btech',
      branchIds: ['br-cse', 'br-it', 'br-ece', 'br-me', 'br-ce', 'br-ee'],
      semester: 8,
      credits: 3,
      category: 'Humanities',
      summary:
        'Final-year engineering project methodology, technical documentation, intellectual property ethics, and open-source licensing.',
      units: [
        {
          id: 'u-bcs801-1',
          unitNumber: 1,
          title: 'Problem Formulation and Literature Review',
          topics: [
            { id: 't-bcs801-1-1', title: 'Research methodology, citation ethics, and scope specification' },
            { id: 't-bcs801-1-2', title: 'Feasibility evaluation and system requirements specification' },
          ],
        },
        {
          id: 'u-bcs801-2',
          unitNumber: 2,
          title: 'System Design and Prototyping',
          topics: [
            { id: 't-bcs801-2-1', title: 'Architecture trade-offs, test plans, and validation benchmarks' },
            { id: 't-bcs801-2-2', title: 'Reproducible builds and technical documentation standards' },
          ],
        },
        {
          id: 'u-bcs801-3',
          unitNumber: 3,
          title: 'Intellectual Property and Open Licensing',
          topics: [
            { id: 't-bcs801-3-1', title: 'Copyright fundamentals, patents, and attribution obligations' },
            { id: 't-bcs801-3-2', title: 'Creative Commons and permissive/copyleft software licenses' },
          ],
        },
      ],
    },
    ...EXTENDED_SUBJECTS,
    ...WIDE_SUBJECTS,
  ],
  notes: [...INITIAL_NOTES, ...EXTENDED_NOTES, ...WIDE_NOTES],
  pyqs: [...INITIAL_PYQS, ...EXTENDED_PYQS, ...WIDE_PYQS],
  announcements: [
    {
      id: 'ann-focus-dark',
      title: 'Dark Mode & Distraction-Free Do Not Disturb Focus Mode Now Available',
      category: 'Platform',
      summary:
        'Switch between high-contrast Light and Dark themes anytime, or enable Do Not Disturb (Alt+D) to hide navigation chrome and study with a live focus countdown timer.',
      publishedAt: '2026-11-23',
      pinned: true,
    },
    {
      id: 'ann-complete-pyq',
      title: '100% Subject Coverage: Original Notes & 70-Mark Exam Blueprints Live',
      category: 'Curriculum',
      summary:
        'Every indexed AKTU B.Tech, Mumbai University, Anna University, and CBSE subject now includes unit-level syllabi, downloadable original Markdown study guides, and full Section A/B/C exam blueprints.',
      publishedAt: '2026-11-23',
      pinned: true,
    },
    {
      id: 'ann-launch-aktu',
      title: 'AKTU B.Tech Curriculum Expanded Across CSE, IT, ECE, ME, CE & EE',
      category: 'Curriculum',
      summary:
        'Added Semester 4 and 5 core subjects for Electronics, Mechanical, Civil, and Electrical branches alongside complete CSE and IT semester tracks.',
      publishedAt: '2026-11-20',
      pinned: false,
    },
    {
      id: 'ann-original-content',
      title: 'Original-Content-First Publishing Policy for Notes & Papers',
      category: 'Policy',
      summary:
        'StudySphere does not mirror copyrighted third-party websites or unlicensed scans. Original faculty/student notes and verified exam blueprints are published directly through our open contribution workflow.',
      publishedAt: '2026-11-18',
      pinned: false,
    },
  ],
  settings: {
    adsEnabled: false,
    adNetworkSlotPrefix: 'studysphere',
    platformNotice: '',
  },
};
