import type { PyqPaper, StudyNote } from './types';

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-bas103-u1',
    title: 'Unit 1 Study Guide: Matrices, Rank, Consistency & Cayley-Hamilton',
    subjectCode: 'BAS103',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Concise exam-oriented guide to row echelon form, matrix rank, Rouche-Capelli consistency conditions, eigenvalues, and Cayley-Hamilton inverse evaluation.',
    contentMarkdown: `## 1. Rank of a Matrix
The rank r(A) of a matrix A is the number of non-zero rows remaining after reducing A to Row Echelon Form (REF) using elementary row operations.
- Elementary row operations never change the rank.
- For an m x n matrix, rank <= min(m, n).
- Normal form PAQ = [Ir 0; 0 0] directly reveals rank r.

## 2. Consistency of Linear Systems (AX = B)
Form the augmented matrix [A | B] and reduce it to echelon form:
- If rank(A) != rank([A | B]): System is inconsistent (no solution).
- If rank(A) = rank([A | B]) = n (number of unknowns): Unique solution.
- If rank(A) = rank([A | B]) = r < n: Infinitely many solutions with (n - r) free parameters.

## 3. Eigenvalues & Cayley-Hamilton Theorem
- Characteristic equation: det(A - lambda*I) = 0.
- Sum of eigenvalues = trace(A); product of eigenvalues = det(A).
- Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation.
- Exam Tip: To find A^-1 using Cayley-Hamilton, multiply the matrix polynomial by A^-1 (valid when det(A) != 0) and isolate A^-1 cleanly.`,
    featured: true,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bas103-u5',
    title: 'Unit 5 Study Guide: Vector Calculus & Integral Theorems',
    subjectCode: 'BAS103',
    unitNumber: 5,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Key definitions and relationships for gradient, divergence, curl, irrotational/solenoidal fields, and Green, Gauss, and Stokes theorems.',
    contentMarkdown: `## 1. Differential Vector Operators
- Gradient (grad f): Points in the direction of steepest ascent; normal to the level surface f(x, y, z) = c.
- Divergence (div F = del . F): Measures net outward flux per unit volume. If div F = 0, F is solenoidal.
- Curl (curl F = del x F): Measures local rotation. If curl F = 0, F is irrotational (conservative).

## 2. Core Integral Theorems
- Green's Theorem (2D plane): Converts a closed line integral around C into a double integral over region R.
- Gauss Divergence Theorem (3D): Converts outward surface flux integral into a triple volume integral of div F.
- Stokes' Theorem (3D surface): Converts closed boundary circulation into a surface integral of (curl F) . n.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs101-u4',
    title: 'Unit 4 Study Guide: Functions, Call Stack & Recursion in C',
    subjectCode: 'BCS101',
    unitNumber: 4,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Parameter passing modes (call by value vs reference via pointers), stack frame allocation, base cases, and classic recursion patterns.',
    contentMarkdown: `## 1. Function Anatomy in C
- Declaration (prototype): Tells the compiler return type and parameter types before invocation.
- Call by Value: Copies argument values into formal parameters; changes inside the function do not alter caller variables.
- Call by Reference (simulated via pointers): Passes memory addresses (&x) so the function can mutate caller variables via dereferencing (*p).

## 2. Recursion Mechanics
Every valid recursive function needs:
1. A reachable Base Case that terminates further calls.
2. A Recursive Step that reduces the problem strictly toward the base case.
- Each active call pushes an activation record (return address, local variables, parameters) onto the call stack.
- Missing a base case causes Stack Overflow.

## 3. Passing Arrays to Functions
When an array is passed to a C function, it decays into a pointer to its first element, so always pass the array length n as a separate parameter.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs101-u5',
    title: 'Unit 5 Study Guide: Pointers, Dynamic Memory & File I/O',
    subjectCode: 'BCS101',
    unitNumber: 5,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Pointer arithmetic rules, malloc/calloc/realloc/free lifecycle, dangling pointer avoidance, and standard stdio file operations.',
    contentMarkdown: `## 1. Pointer Fundamentals
- & (address-of) obtains a variable's memory address; * (dereference) reads/writes the value at that address.
- Pointer arithmetic scales automatically by sizeof(type): if int *p = arr, then p + 1 advances by sizeof(int) bytes.

## 2. Dynamic Memory Allocation (<stdlib.h>)
- malloc(size): Allocates uninitialized raw bytes on the heap; returns NULL on failure.
- calloc(n, elem_size): Allocates zero-initialized contiguous memory for n elements.
- realloc(ptr, new_size): Resizes an existing heap block safely.
- free(ptr): Releases heap memory; set ptr = NULL immediately afterward to avoid dangling pointers.

## 3. File Handling (<stdio.h>)
- Modes: "r" (read), "w" (write/truncate), "a" (append), "rb"/"wb" (binary).
- Always check if (fp == NULL) after fopen() and close resources with fclose(fp).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bas203-u2',
    title: 'Unit 2 Study Guide: Laplace Transforms & IVP Solutions',
    subjectCode: 'BAS203',
    unitNumber: 2,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Standard Laplace transform pairs, first and second shifting theorems, convolution theorem, and solving initial value differential equations.',
    contentMarkdown: `## 1. Definition & Existence
L{f(t)} = integral from 0 to infinity of e^(-st) * f(t) dt.
Existence holds if f(t) is piecewise continuous on [0, infinity) and of exponential order as t -> infinity.

## 2. Essential Transform Properties
- First Shifting: L{e^(at) * f(t)} = F(s - a).
- Second Shifting (Heaviside step u(t - a)): L{f(t - a)u(t - a)} = e^(-as) * F(s).
- Derivative Property: L{f'(t)} = sF(s) - f(0); L{f''(t)} = s^2 F(s) - sf(0) - f'(0).
- Convolution Theorem: L^-1{F(s) * G(s)} = integral from 0 to t of f(u)g(t - u) du.

## 3. Exam Workflow for Solving ODEs
1. Take Laplace transform of both sides.
2. Substitute initial conditions y(0) and y'(0).
3. Solve algebraically for Y(s) and decompose into partial fractions.
4. Apply inverse Laplace transform term-by-term.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bee101-u1',
    title: 'Unit 1 Study Guide: DC Circuit Laws & Network Theorems',
    subjectCode: 'BEE101',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Step-by-step reference for KCL/KVL, mesh and nodal analysis, Superposition, Thevenin/Norton equivalents, and Maximum Power Transfer.',
    contentMarkdown: `## 1. Kirchhoff Laws
- KCL (Node): Algebraic sum of currents entering a node equals the sum leaving it (charge conservation).
- KVL (Loop): Algebraic sum of voltage rises and drops around any closed loop equals zero (energy conservation).

## 2. Thevenin & Norton Equivalents
- Vth: Open-circuit voltage across load terminals A-B.
- Rth: Equivalent resistance seen from A-B with independent voltage sources shorted and independent current sources opened.
- Norton Current: In = Vth / Rth; Rn = Rth.

## 3. Maximum Power Transfer (DC)
A resistive load RL draws maximum power from a linear DC network when RL = Rth, delivering Pmax = (Vth^2) / (4 * Rth).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs301-u1',
    title: 'Unit 1 Study Guide: Asymptotic Analysis, Arrays & Linked Lists',
    subjectCode: 'BCS301',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Big-O/Omega/Theta complexity bounds, row-major and column-major array address formulas, sparse matrices, and linked list operations.',
    contentMarkdown: `## 1. Asymptotic Notations
- Big-O (Upper Bound): f(n) = O(g(n)) if 0 <= f(n) <= c * g(n) for all n >= n0 (worst-case growth cap).
- Big-Omega (Lower Bound): f(n) = Omega(g(n)) if f(n) >= c * g(n) for all n >= n0.
- Big-Theta (Tight Bound): Both O(g(n)) and Omega(g(n)) hold simultaneously.

## 2. 2D Array Address Calculation
For array A[LB1..UB1][LB2..UB2] with element size w bytes and base address B:
- Row-Major: Loc(A[i][j]) = B + w * [(i - LB1) * N + (j - LB2)], where N = UB2 - LB2 + 1.
- Column-Major: Loc(A[i][j]) = B + w * [(j - LB2) * M + (i - LB1)], where M = UB1 - LB1 + 1.

## 3. Linked List Variants & Time Complexities
- Singly Linked List: O(1) insert/delete at head; O(n) search and tail deletion without tail pointer.
- Doubly Linked List: O(1) deletion when node pointer is known; extra prev pointer overhead.
- Circular Linked List: Tail points back to head; useful for round-robin task scheduling and polynomial addition.`,
    featured: true,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs301-u2',
    title: 'Unit 2 Study Guide: Stacks, Expression Conversion & Queues',
    subjectCode: 'BCS301',
    unitNumber: 2,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'LIFO/FIFO ADTs, infix-to-postfix operator precedence rules, postfix evaluation trace, circular queue modulo indexing, and priority queues.',
    contentMarkdown: `## 1. Stack ADT & Infix-to-Postfix Algorithm
Stacks follow LIFO (Last-In, First-Out) with O(1) push, pop, and peek.
Operator precedence (highest to lowest): ^ (right-associative) > *, / (left-associative) > +, - (left-associative).
- Operand: Append directly to postfix output.
- '(': Push onto operator stack.
- ')': Pop and output until matching '(' is removed.
- Operator: Pop operators of higher (or equal, if left-associative) precedence before pushing.

## 2. Queue Variations
- Linear Array Queue suffers from false overflow as rear reaches MAX - 1.
- Circular Queue fixes this with modulo wrap-around: rear = (rear + 1) % MAX, front = (front + 1) % MAX.
- Deque allows insertion and deletion at both ends; Priority Queue dequeues highest-priority item (typically via Binary Heap in O(log n)).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs301-u4',
    title: 'Unit 4 Study Guide: Graph Traversals, MST & Shortest Paths',
    subjectCode: 'BCS301',
    unitNumber: 4,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Adjacency matrix vs list trade-offs, BFS vs DFS, Prim and Kruskal minimum spanning trees, Dijkstra and Floyd-Warshall shortest paths.',
    contentMarkdown: `## 1. Graph Representations
- Adjacency Matrix: O(V^2) space, O(1) edge lookup — suited for dense graphs.
- Adjacency List: O(V + E) space, fast neighbor iteration — suited for sparse graphs.

## 2. Traversals: BFS vs DFS
- BFS (Queue): Explores level by level; finds shortest unweighted path in O(V + E).
- DFS (Stack / Recursion): Explores depth-first; used for cycle detection, topological sorting, and strongly connected components.

## 3. MST & Shortest Path Algorithms
- Kruskal's MST: Sort all edges by weight, add edges avoiding cycles via Disjoint Set Union — O(E log E).
- Prim's MST: Grow single tree greedily from source using min-heap — O(E log V).
- Dijkstra's Algorithm: Single-source shortest path for non-negative edge weights.
- Floyd-Warshall: All-pairs shortest path using dynamic programming in O(V^3).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs301-u5',
    title: 'Unit 5 Study Guide: Binary Search Trees, AVL Rotations & B-Trees',
    subjectCode: 'BCS301',
    unitNumber: 5,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Tree traversals, BST insertion/deletion cases, AVL balance factor rotations (LL, RR, LR, RL), Huffman coding, and B-Tree indexing.',
    contentMarkdown: `## 1. Tree Traversals
- Inorder (Left, Root, Right): Produces sorted ascending order on a valid BST.
- Preorder (Root, Left, Right): Useful for cloning/serializing tree structure.
- Postorder (Left, Right, Root): Useful for deleting trees bottom-up and evaluating expression trees.

## 2. AVL Tree Rebalancing
Balance Factor BF(node) = height(left) - height(right) must remain in {-1, 0, +1}.
- LL Imbalance: Single Right Rotation.
- RR Imbalance: Single Left Rotation.
- LR Imbalance: Left Rotation on left child, then Right Rotation on unbalanced ancestor.
- RL Imbalance: Right Rotation on right child, then Left Rotation on unbalanced ancestor.

## 3. Multi-Way Search Trees (B-Trees & B+ Trees)
Designed for disk-based storage systems where minimizing block I/O matters. All leaves lie at the exact same depth; in B+ Trees, all data pointers live in linked leaf nodes for fast range queries.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs302-u4',
    title: 'Unit 4 Study Guide: Cache Mapping Policies & Virtual Memory',
    subjectCode: 'BCS302',
    unitNumber: 4,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Direct, fully associative, and k-way set-associative cache tag-index-offset bit breakdowns, write policies, and TLB paging.',
    contentMarkdown: `## 1. Memory Hierarchy Principle
Exploits Temporal Locality (recently accessed data is reused soon) and Spatial Locality (nearby addresses are accessed sequentially).

## 2. Cache Address Partitioning
Physical address bits split into: [ Tag | Line/Set Index | Block Offset ].
- Direct Mapped: Each main memory block maps to exactly one cache line (Line = Block mod TotalLines). Simple hardware, higher conflict misses.
- Fully Associative: Any block fits in any line; no index field; compares all tags in parallel.
- k-Way Set Associative: Compromise dividing cache into S = Lines / k sets; reduces conflict misses cleanly.

## 3. Write Policies
- Write-Through: Updates cache and main memory together (consistent, higher bus traffic).
- Write-Back: Updates cache only and sets Dirty Bit; writes to memory upon eviction (faster, needs coherence handling).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs303-u3',
    title: 'Unit 3 Study Guide: Posets, Lattices & Karnaugh Map Minimization',
    subjectCode: 'BCS303',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Hasse diagram construction, GLB/LUB lattice verification, distributive/complemented lattices, and SOP/POS K-map simplification.',
    contentMarkdown: `## 1. Partial Orders & Hasse Diagrams
A relation R on set A is a partial order if it is Reflexive, Antisymmetric, and Transitive.
To draw a Hasse diagram: omit self-loops, omit transitive shortcut edges, and orient edges upward.

## 2. Lattices
A poset (L, <=) is a lattice if every pair {a, b} has both a Least Upper Bound (join: a v b) and a Greatest Lower Bound (meet: a ^ b).
- Bounded Lattice: Has universal lower bound (0) and upper bound (1).
- Boolean Algebra: A lattice that is both distributive and complemented.

## 3. Boolean Simplification
- Group adjacent 1s in K-map powers of 2 (1, 2, 4, 8, 16) including wrap-around edges.
- Always cover essential prime implicants first to obtain minimal Sum of Products (SOP).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bec301-u3',
    title: 'Unit 3 Study Guide: P-N Junction Electrostatics & Breakdown',
    subjectCode: 'BEC301',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Built-in potential derivation, forward vs reverse bias depletion width behavior, Zener vs Avalanche breakdown, and diode capacitances.',
    contentMarkdown: `## 1. Built-In Potential (Vbi)
At thermal equilibrium, drift current cancels diffusion current across the space-charge region:
Vbi = (kT / q) * ln((Na * Nd) / ni^2).
- Forward Bias lowers barrier to (Vbi - Vf), narrowing depletion width and enabling exponential current flow.
- Reverse Bias raises barrier to (Vbi + Vr), widening depletion width with small reverse saturation current I0.

## 2. Breakdown Mechanisms
- Zener Breakdown: Occurs in heavily doped junctions (< 5V) via quantum tunneling across a very narrow depletion region; has a negative temperature coefficient.
- Avalanche Breakdown: Occurs in lightly doped junctions (> 6V) via impact ionization carrier multiplication; has a positive temperature coefficient.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bme301-u2',
    title: 'Unit 2 Study Guide: Second Law, Carnot Efficiency & Entropy',
    subjectCode: 'BME301',
    unitNumber: 2,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Kelvin-Planck and Clausius equivalence, reversible Carnot heat engine & refrigerator COP formulas, and Clausius inequality.',
    contentMarkdown: `## 1. Statements of the Second Law
- Kelvin-Planck: No cyclic device can produce net work while exchanging heat with only a single thermal reservoir.
- Clausius: Heat cannot spontaneously flow from a colder body to a hotter body without external work input.

## 2. Carnot Cycle Benchmarks
For absolute temperatures TH (source) and TL (sink) in Kelvin:
- Heat Engine Efficiency: eta_Carnot = 1 - (TL / TH).
- Refrigerator COP: COP_R = TL / (TH - TL).
- Heat Pump COP: COP_HP = TH / (TH - TL) = COP_R + 1.

## 3. Entropy & Principle of Increase
Clausius Inequality: cyclic integral of (dQ / T) <= 0 (equality holds only for reversible cycles).
For any isolated system, delta S_universe = delta S_system + delta S_surroundings >= 0.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bce301-u2',
    title: 'Unit 2 Study Guide: Determinate Truss Analysis & Dry Friction',
    subjectCode: 'BCE301',
    unitNumber: 2,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Static determinacy condition m = 2j - 3, Method of Joints vs Method of Sections workflow, zero-force members, and Coulomb friction laws.',
    contentMarkdown: `## 1. Plane Truss Determinacy
A pin-jointed plane truss with m members and j joints is statically determinate externally and internally when m = 2j - 3.
- Method of Joints: Start at a joint with at most 2 unknown member forces; apply Sum Fx = 0 and Sum Fy = 0.
- Method of Sections: Cut through at most 3 members (including the target member) and take moments about the intersection of the other two unknowns.

## 2. Dry Coulomb Friction
- Limiting static friction: Fs_max = mu_s * N.
- Kinetic friction during slip: Fk = mu_k * N (where mu_k < mu_s).
- Angle of friction phi = arctan(mu_s); on an incline, block begins sliding when inclination angle theta reaches angle of repose.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs401-u3',
    title: 'Unit 3 Study Guide: CPU Scheduling Algorithms & Deadlocks',
    subjectCode: 'BCS401',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Gantt chart metrics (TAT, WT), FCFS/SJF/SRTF/Round-Robin comparison, four Coffman deadlock conditions, and Banker safety algorithm.',
    contentMarkdown: `## 1. Scheduling Performance Formulas
- Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT).
- Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT).
- Response Time = First CPU Allocation Time - Arrival Time.
- SJF/SRTF minimizes average waiting time but risks starvation; Round Robin guarantees bounded response time based on time quantum q.

## 2. Deadlock Conditions (All 4 Must Hold Simultaneously)
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

## 3. Banker's Algorithm (Deadlock Avoidance)
Compute Need[i] = Max[i] - Allocation[i].
Repeatedly locate an unfinished process i with Need[i] <= Work, simulate completion (Work = Work + Allocation[i]), and mark Finish[i] = true. If every process finishes, the state is Safe.`,
    featured: true,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs401-u4',
    title: 'Unit 4 Study Guide: Paging, Page Replacement & Thrashing',
    subjectCode: 'BCS401',
    unitNumber: 4,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Logical-to-physical address translation, effective memory access time with TLB, FIFO/LRU/Optimal page faults, and Belady anomaly.',
    contentMarkdown: `## 1. Paging Address Translation
Logical address splits into Page Number (p) and Page Offset (d).
- Page Table maps p -> Frame Number (f); Physical Address = f * PageSize + d.
- Effective Access Time with TLB hit ratio alpha, TLB latency t, and RAM latency m:
  EAT = alpha * (t + m) + (1 - alpha) * (t + 2m).

## 2. Page Replacement Policies
- FIFO: Evicts oldest loaded page; susceptible to Belady's Anomaly (more frames can yield more faults).
- Optimal (Belady): Evicts page unused for the longest future time (theoretical lower bound).
- LRU (Least Recently Used): Practical stack algorithm free from Belady's anomaly.

## 3. Thrashing Control
Thrashing occurs when processes spend more time paging than executing. Prevented using Working-Set Model or Page-Fault Frequency (PFF) frame control.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs402-u1',
    title: 'Unit 1 Study Guide: DFA, NFA Subset Construction & Minimization',
    subjectCode: 'BCS402',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Formal 5-tuple definitions, epsilon-closure computation, NFA-to-DFA subset construction steps, and Myhill-Nerode equivalence partitioning.',
    contentMarkdown: `## 1. Deterministic vs Non-Deterministic Finite Automata
A Finite Automaton is M = (Q, Sigma, delta, q0, F).
- In DFA, delta: Q x Sigma -> Q produces exactly one next state per input symbol.
- In NFA, delta: Q x Sigma -> 2^Q allows zero, one, or multiple transitions; an input string is accepted if at least one path ends in F.

## 2. Converting NFA to Equivalent DFA
1. Start DFA state = epsilon-closure(q0).
2. For each unmarked DFA state S and each symbol a in Sigma, compute union of transitions from states in S on a (and take epsilon-closure).
3. Mark any subset containing at least one original accepting state as an accepting DFA state.

## 3. DFA State Minimization
Partition states into 0-equivalence sets: Final (F) and Non-Final (Q - F). Iteratively split groups whenever two states transition into different groups on some input symbol until partitions stabilize.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs501-u3',
    title: 'Unit 3 Study Guide: Functional Dependencies & Normalization (1NF–BCNF)',
    subjectCode: 'BCS501',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Attribute closure, candidate key discovery, canonical cover extraction, 2NF/3NF/BCNF tests, and lossless-join verification.',
    contentMarkdown: `## 1. Finding Candidate Keys via Attribute Closure (X+)
1. Partition attributes into Left-Only, Middle, Right-Only, and Neither.
2. Essential attributes (Left-Only + Neither) MUST be part of every candidate key.
3. Compute closure of essential attributes; if it covers all attributes R, that is the sole candidate key. Otherwise augment with Middle attributes minimally.

## 2. Normal Forms Checklist (for every non-trivial FD X -> Y)
- 1NF: All attribute values are atomic (no multi-valued or repeating groups).
- 2NF: No partial dependency of a non-prime attribute on a proper subset of a candidate key.
- 3NF: Either X is a superkey OR Y is a prime attribute (part of some candidate key). Always lossless AND dependency-preserving.
- BCNF: X MUST be a superkey. Always lossless, but occasionally sacrifices dependency preservation.`,
    featured: true,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs503-u1',
    title: 'Unit 1 Study Guide: Recurrence Relations & The Master Theorem',
    subjectCode: 'BCS503',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Solving divide-and-conquer recurrences T(n) = aT(n/b) + f(n) across all three Master Theorem cases plus recursion-tree intuition.',
    contentMarkdown: `## 1. Master Theorem Standard Form
For T(n) = a * T(n / b) + f(n), where a >= 1, b > 1, compute the critical exponent c_crit = log_b(a):
- Case 1 (Leaves Dominate): If f(n) = O(n^(c_crit - eps)) for some eps > 0, then T(n) = Theta(n^c_crit).
- Case 2 (Balanced Levels): If f(n) = Theta(n^c_crit * log^k(n)) for k >= 0, then T(n) = Theta(n^c_crit * log^(k+1)(n)).
- Case 3 (Root Dominates): If f(n) = Omega(n^(c_crit + eps)) and regularity condition a*f(n/b) <= c*f(n) holds for c < 1, then T(n) = Theta(f(n)).

## 2. Common Algorithm Benchmarks
- Binary Search: T(n) = T(n/2) + O(1) -> Theta(log n).
- Merge Sort: T(n) = 2T(n/2) + O(n) -> Theta(n log n).
- Strassen Matrix Multiply: T(n) = 7T(n/2) + O(n^2) -> Theta(n^2.81).`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs601-u4',
    title: 'Unit 4 Study Guide: Software Testing & Cyclomatic Complexity',
    subjectCode: 'BCS601',
    unitNumber: 4,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Black-box vs white-box techniques, boundary value analysis, equivalence classes, and McCabe cyclomatic complexity formulas.',
    contentMarkdown: `## 1. Black-Box vs White-Box Testing
- Black-Box (Functional): Tests inputs/outputs against SRS without reading source code — Equivalence Class Partitioning, Boundary Value Analysis (min, min+, nom, max-, max).
- White-Box (Structural): Inspects control flow — Statement, Branch, Condition, and Basis Path coverage.

## 2. McCabe Cyclomatic Complexity V(G)
Measures the number of linearly independent paths through a program's Control Flow Graph (CFG):
- V(G) = E - N + 2P (Edges - Nodes + 2 * Connected Components).
- V(G) = Number of predicate/decision nodes + 1.
- V(G) = Total bounded + unbounded regions in a planar CFG.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs603-u3',
    title: 'Unit 3 Study Guide: IPv4 CIDR Subnetting & Routing Protocols',
    subjectCode: 'BCS603',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'CIDR prefix calculations, host count formulas, subnet masks, and comparison of Distance-Vector (RIP) vs Link-State (OSPF) routing.',
    contentMarkdown: `## 1. CIDR Subnetting Formulas
For prefix length /p on a 32-bit IPv4 address:
- Host bits h = 32 - p.
- Total IP addresses in block = 2^h; usable host addresses = 2^h - 2 (excluding network ID and directed broadcast).
- Block increment in the active octet = 256 - subnet_mask_octet.

## 2. Routing Protocols
- Distance-Vector (RIP): Shares entire routing table with immediate neighbors using Bellman-Ford; vulnerable to count-to-infinity (mitigated by split horizon & poison reverse).
- Link-State (OSPF): Floods link-state advertisements to build full topology graph; runs Dijkstra locally for fast convergence.
- Path-Vector (BGP): Inter-autonomous-system routing across the Internet using AS-path policy attributes.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs701-u1',
    title: 'Unit 1 Study Guide: Logical Clocks & Causal Ordering',
    subjectCode: 'BCS701',
    unitNumber: 1,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Happened-before relation, Lamport scalar clock update rules, and why Vector Clocks accurately detect concurrent distributed events.',
    contentMarkdown: `## 1. Lamport Happened-Before Relation (a -> b)
- Same process: If a occurs before b in process Pi, then a -> b.
- Message passing: If a is send(m) and b is receive(m), then a -> b.
- Transitivity: If a -> b and b -> c, then a -> c.

## 2. Lamport Clocks vs Vector Clocks
- Lamport Rule: Increment Ci before each local event; on receiving timestamp t, set Ci = max(Ci, t) + 1. Guarantees (a -> b) implies L(a) < L(b), but NOT the converse.
- Vector Clocks: Maintain array V[1..N]; captures exact causality: V(a) < V(b) if and only if a -> b, enabling exact detection of concurrent updates.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
  {
    id: 'note-bcs801-u3',
    title: 'Unit 3 Study Guide: Intellectual Property & Open Licensing',
    subjectCode: 'BCS801',
    unitNumber: 3,
    authorName: 'StudySphere Academic Editorial',
    license: 'Original StudySphere',
    summary:
      'Distinctions among copyrights, patents, and trademarks, plus MIT/Apache-2.0 permissive vs GPL copyleft and Creative Commons licenses.',
    contentMarkdown: `## 1. Forms of Intellectual Property
- Copyright: Protects original literary, artistic, academic, and software expressions automatically upon creation.
- Patent: Protects novel, non-obvious, industrially useful inventions/processes for a statutory term (typically 20 years).
- Trademark: Protects brand names, symbols, and distinctive identifiers in commerce.

## 2. Open Licensing for Engineering Projects
- Permissive (MIT, BSD, Apache 2.0): Allows commercial reuse and proprietary derivatives with attribution notice.
- Copyleft (GNU GPL): Requires derivative distributed works to share source under compatible open terms.
- Creative Commons (CC BY, CC BY-SA): Standard open licenses for educational notes, diagrams, and documentation.`,
    featured: false,
    publishedAt: '2026-11-22',
  },
];

export const INITIAL_PYQS: PyqPaper[] = [
  {
    id: 'pyq-bas103-2025-odd',
    title: 'BAS103 Engineering Mathematics I — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BAS103',
    examYear: 2025,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original StudySphere practice paper modeled on the 70-mark AKTU B.Tech CBCS theory blueprint covering Units 1–5.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: false,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Conceptual Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'Define the rank of a matrix and state the rank of a 3×3 identity matrix.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'State the Cayley-Hamilton theorem for a square matrix A.', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'State Euler’s theorem for a homogeneous function of degree n in two variables.', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'Write the condition for two functions u(x, y) and v(x, y) to be functionally dependent.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'State the relation between the Beta function B(m, n) and Gamma function.', marks: 2, unitNumber: 4 },
          { number: '1(f)', text: 'When is a differentiable vector field F called solenoidal and irrotational?', marks: 2, unitNumber: 5 },
          { number: '1(g)', text: 'Give the geometric interpretation of the gradient of a scalar field f(x, y, z).', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Analytical Problems',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Test the consistency of the linear system x + 2y - z = 3, 3x - y + 2z = 1, 2x - 2y + 3z = 2 and solve if consistent.', marks: 7, unitNumber: 1 },
          { number: '2(b)', text: 'If y = sin(m sin^-1 x), prove using Leibnitz theorem that (1 - x^2) y_(n+2) - (2n + 1) x y_(n+1) - (n^2 - m^2) y_n = 0.', marks: 7, unitNumber: 2 },
          { number: '2(c)', text: 'Expand f(x, y) = e^x cos y in powers of x and y up to third-degree terms using Taylor’s theorem.', marks: 7, unitNumber: 3 },
          { number: '2(d)', text: 'Evaluate the double integral over the positive quadrant bounded by x + y = 1 by changing the order of integration.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'Verify Green’s theorem in the plane for the closed curve bounded by y = x and y = x^2.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — Unit-Wise Long Questions',
        instruction: 'Attempt one question from each unit (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Find all eigenvalues and corresponding eigenvectors of A = [[2, 1, 1], [1, 2, 1], [0, 0, 1]] and verify diagonalizability.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Trace the Cartesian curve y^2 (a - x) = x^3 by checking symmetry, origin tangents, asymptotes, and region of existence.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Use Lagrange’s method of undetermined multipliers to find the maximum volume of a rectangular box inscribed in the ellipsoid x^2/a^2 + y^2/b^2 + z^2/c^2 = 1.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Use Dirichlet’s integral to evaluate the volume of the region bounded by coordinate planes and (x/a)^p + (y/b)^q + (z/c)^r = 1.', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Apply Gauss Divergence Theorem to evaluate the outward surface flux of F = x^3 i + y^3 j + z^3 k over the sphere x^2 + y^2 + z^2 = a^2.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs101-2025-odd',
    title: 'BCS101 Programming for Problem Solving — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS101',
    examYear: 2025,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original C programming exam practice blueprint aligned with AKTU First-Year Units 1–5.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: false,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'Differentiate between a compiler and an interpreter with two concise points.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'Distinguish between static and auto storage classes in C.', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'What is the difference between break and continue inside nested loops?', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'Contrast a C structure (struct) with a union regarding memory layout.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'Why is a base condition mandatory in every recursive C function?', marks: 2, unitNumber: 4 },
          { number: '1(f)', text: 'What is a dangling pointer and how do you avoid it after calling free()?', marks: 2, unitNumber: 5 },
          { number: '1(g)', text: 'State the role of argc and argv in main(int argc, char *argv[]).', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Programming & Analysis',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Explain the memory hierarchy of a digital computer and convert (147.625)_10 to binary and hexadecimal.', marks: 7, unitNumber: 1 },
          { number: '2(b)', text: 'Write a menu-driven C program using switch-case and loops to check Armstrong numbers and prime numbers in a user-given range.', marks: 7, unitNumber: 2 },
          { number: '2(c)', text: 'Write a C program to multiply two compatible matrices and verify dimension compatibility before computing.', marks: 7, unitNumber: 3 },
          { number: '2(d)', text: 'Compare call by value and call by reference with a complete C program demonstrating variable swapping and array reversal.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'Write a C program using malloc() and realloc() to store student marks dynamically and compute their average.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — Long Design Problems',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Draw a flowchart and write an algorithm to find the real or complex roots of a quadratic equation ax^2 + bx + c = 0.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Write a C program without using <string.h> library functions to check whether an input string is a palindrome and count vowels.', marks: 7, unitNumber: 3 },
          { number: '5', text: 'Define a Student structure containing rollNo, name, and 5 subject marks. Write a C function to sort N student records by total marks.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Implement recursive functions for Fibonacci numbers and GCD (Euclid algorithm), and trace the call stack for GCD(48, 18).', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Write a C program that reads a text file, counts total lines, words, and characters, and writes the summary into an output file.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs301-2025-odd',
    title: 'BCS301 Data Structures — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS301',
    examYear: 2025,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Comprehensive original exam blueprint covering asymptotic analysis, linked lists, stacks/queues, sorting, graphs, and balanced trees.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: true,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Conceptual Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'Compare Big-O, Big-Omega, and Big-Theta notations in algorithm analysis.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'Why is a sparse matrix stored in 3-tuple or linked form instead of a 2D array?', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'How does a circular queue resolve the false overflow limitation of a linear queue?', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'State the worst-case and average-case time complexities of Quick Sort and Merge Sort.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'Differentiate between open addressing and separate chaining in hash tables.', marks: 2, unitNumber: 3 },
          { number: '1(f)', text: 'Compare BFS and DFS with respect to underlying data structure and space complexity.', marks: 2, unitNumber: 4 },
          { number: '1(g)', text: 'Define the balance factor of a node in an AVL tree.', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Algorithmic & Trace Questions',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Derive the row-major and column-major address formulas for a 2D array A[1..20][1..15] with base address 2000 and 4-byte elements; locate A[12][8].', marks: 7, unitNumber: 1 },
          { number: '2(b)', text: 'Convert the infix expression A + (B * C - (D / E ^ F) * G) * H into postfix step-by-step using a stack table.', marks: 7, unitNumber: 2 },
          { number: '2(c)', text: 'Insert keys {27, 41, 18, 55, 68, 31, 90} into a hash table of size 11 using linear probing and quadratic probing; compare probe counts.', marks: 7, unitNumber: 3 },
          { number: '2(d)', text: 'Trace Dijkstra’s shortest-path algorithm on a 5-vertex weighted directed graph with non-negative edges and show the distance table at each step.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'Construct a binary tree uniquely given Inorder: D B E A F C G and Preorder: A B D E C F G, then write its Postorder traversal.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — In-Depth Unit Problems',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Write C algorithms to insert a node at a given position and reverse a singly linked list in O(n) time and O(1) extra space.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Explain tail recursion vs non-tail recursion and solve the Tower of Hanoi problem for n = 3 disks with complete recursive trace.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Write the Heap Sort algorithm, build a max-heap from [14, 22, 9, 31, 18, 45, 7], and trace the first three extraction steps.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Compare Prim’s and Kruskal’s MST algorithms and construct the Minimum Spanning Tree for a connected 6-node weighted graph.', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Insert the sequence 30, 20, 40, 10, 25, 35, 50, 5, 15 into an initially empty AVL tree, clearly labeling every LL, RR, LR, or RL rotation.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs401-2025-even',
    title: 'BCS401 Operating Systems — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS401',
    examYear: 2025,
    examSession: 'Even Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original AKTU-aligned practice blueprint covering processes, synchronization, CPU scheduling, Banker’s algorithm, paging, and disk scheduling.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: true,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'List four fields stored inside a Process Control Block (PCB).', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'Distinguish between user-level threads and kernel-level threads.', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'State the three requirements any valid Critical Section solution must satisfy.', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'Define convoy effect in FCFS CPU scheduling.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'List the four necessary conditions for deadlock.', marks: 2, unitNumber: 3 },
          { number: '1(f)', text: 'What is Belady’s anomaly? Name one page replacement policy immune to it.', marks: 2, unitNumber: 4 },
          { number: '1(g)', text: 'Differentiate between contiguous and indexed file allocation.', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Numericals & Design',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Draw the 7-state process transition diagram and explain the role of long-term, medium-term, and short-term schedulers.', marks: 7, unitNumber: 1 },
          { number: '2(b)', text: 'Write a semaphore-based solution to the Bounded-Buffer Producer-Consumer problem and explain why semaphore wait order matters.', marks: 7, unitNumber: 2 },
          { number: '2(c)', text: 'Given 4 processes with Arrival Times (0, 1, 2, 3) and Burst Times (7, 4, 9, 5), draw Gantt charts and compute Avg WT & TAT for SRTF and Round Robin (q = 3).', marks: 7, unitNumber: 3 },
          { number: '2(d)', text: 'For reference string 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 with 3 frames, compute page faults under FIFO, LRU, and Optimal policies.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'A disk queue has requests at cylinders 82, 170, 43, 140, 24, 16, 190 with head initially at 50 moving upward (0–199). Compute total head movement for SSTF and SCAN.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — Long Analytical Problems',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Compare monolithic, microkernel, and layered OS architectures with concrete trade-offs in performance and fault isolation.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Explain the Dining Philosophers problem and design a deadlock-free monitor or asymmetric semaphore solution.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Illustrate Banker’s safety algorithm with a 5-process, 3-resource snapshot table; determine a safe sequence and test a new request vector.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Explain demand paging, TLB hit ratio, and Effective Access Time; also discuss how the Working-Set model controls thrashing.', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Explain Unix inode structure (direct, single/double/triple indirect blocks) and compare RAID 0, RAID 1, and RAID 5.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs501-2025-odd',
    title: 'BCS501 Database Management System — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS501',
    examYear: 2025,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original exam practice blueprint spanning ER modeling, relational algebra/SQL, normalization, serializability, and 2PL recovery.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: true,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'Differentiate between logical data independence and physical data independence.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'What is a weak entity set? Give an example with its partial key.', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'Distinguish between WHERE and HAVING clauses in SQL.', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'State Armstrong’s three basic inference axioms for functional dependencies.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'When is a binary decomposition R1, R2 of relation R guaranteed to be lossless?', marks: 2, unitNumber: 3 },
          { number: '1(f)', text: 'Define conflict-equivalent schedules in transaction processing.', marks: 2, unitNumber: 4 },
          { number: '1(g)', text: 'What is Write-Ahead Logging (WAL) in crash recovery?', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Queries & Theory',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Design a complete ER diagram for a University Examination System with Students, Courses, Faculty, Departments, and Enrollments, then map it to relational tables.', marks: 7, unitNumber: 1 },
          { number: '2(b)', text: 'Given Employee(eid, ename, deptId, salary) and Dept(deptId, dname), write both Relational Algebra and SQL queries for top-paid employees per department.', marks: 7, unitNumber: 2 },
          { number: '2(c)', text: 'For R(A, B, C, D, E) with FDs {A -> BC, CD -> E, B -> D, E -> A}, find all candidate keys and identify the highest normal form.', marks: 7, unitNumber: 3 },
          { number: '2(d)', text: 'Construct a precedence graph for a given 3-transaction interleaved schedule to determine conflict serializability and equivalent serial order.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'Explain Strict Two-Phase Locking (Strict 2PL) and demonstrate how it prevents cascading aborts.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — Unit-Wise Long Questions',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Explain the ANSI/SPARC three-schema architecture and distinguish specialization, generalization, and aggregation in EER modeling.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Explain outer joins (LEFT, RIGHT, FULL), correlated subqueries, views, and database triggers with clean SQL examples.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Explain the algorithm for computing a canonical cover and decompose a relation into 3NF preserving both lossless join and dependencies.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Compare conflict serializability with view serializability, and distinguish recoverable, cascadeless, and strict schedules.', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Describe timestamp-based concurrency control (Thomas Write Rule) and explain checkpointing and ARIES recovery phases (Analysis, Redo, Undo).', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs503-2025-odd',
    title: 'BCS503 Design and Analysis of Algorithms — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS503',
    examYear: 2025,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original exam blueprint covering recurrences, Red-Black trees, greedy, dynamic programming, string matching, and NP-completeness.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: false,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'Solve T(n) = 4T(n/2) + n^2 using the Master Theorem.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'Why is Counting Sort stable, and when does it outperform comparison sorts?', marks: 2, unitNumber: 1 },
          { number: '1(c)', text: 'State the five structural properties of a Red-Black Tree.', marks: 2, unitNumber: 2 },
          { number: '1(d)', text: 'Contrast greedy choice property with optimal substructure.', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'Why does the greedy strategy fail for 0/1 Knapsack even though it works for Fractional Knapsack?', marks: 2, unitNumber: 4 },
          { number: '1(f)', text: 'What is a spurious hit in the Rabin-Karp string matching algorithm?', marks: 2, unitNumber: 5 },
          { number: '1(g)', text: 'Differentiate between NP-Hard and NP-Complete problem classes.', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Algorithmic Derivations',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Explain Strassen’s matrix multiplication and derive its asymptotic recurrence complexity.', marks: 7, unitNumber: 3 },
          { number: '2(b)', text: 'Construct the DP table to find the Longest Common Subsequence (LCS) of X = "AGGTAB" and Y = "GXTXAYB".', marks: 7, unitNumber: 4 },
          { number: '2(c)', text: 'Compute the prefix function (LPS array) for pattern "ABABACA" and explain how KMP avoids redundant character comparisons.', marks: 7, unitNumber: 5 },
          { number: '2(d)', text: 'Explain aggregate and potential methods of amortized analysis using a dynamic stack with MULTIPOP.', marks: 7, unitNumber: 2 },
          { number: '2(e)', text: 'Solve the 4-Queens problem using backtracking and draw the pruned state-space tree.', marks: 7, unitNumber: 4 },
        ],
      },
      {
        name: 'Section C — Long Problems',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Solve T(n) = T(n/3) + T(2n/3) + cn using the recursion tree method and verify via substitution.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Explain Binomial Heap structure and trace the UNION operation on two binomial heaps.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Explain Activity Selection and Huffman Coding as greedy algorithms, proving correctness for one of them.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Solve Matrix Chain Multiplication for dimensions [10, 30, 5, 60] showing both cost table m[i, j] and split table s[i, j].', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Explain polynomial-time reduction and outline how 3-SAT reduces to CLIQUE to establish NP-Completeness.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
  {
    id: 'pyq-bcs603-2025-even',
    title: 'BCS603 Computer Networks — Original 70-Mark Exam Practice Blueprint',
    subjectCode: 'BCS603',
    examYear: 2025,
    examSession: 'Even Semester',
    paperType: 'Original Practice Blueprint',
    authorNote:
      'Original exam blueprint covering OSI/TCP-IP layers, CRC/sliding window, IPv4 subnetting, routing, TCP congestion control, and DNS/TLS.',
    durationMinutes: 180,
    maxMarks: 70,
    featured: false,
    publishedAt: '2026-11-22',
    sections: [
      {
        name: 'Section A — Short Questions',
        instruction: 'Attempt all 7 questions (7 × 2 = 14 Marks).',
        questions: [
          { number: '1(a)', text: 'State the Shannon channel capacity formula for a noisy channel.', marks: 2, unitNumber: 1 },
          { number: '1(b)', text: 'Why is CSMA/CD unsuitable for wireless LANs, requiring CSMA/CA instead?', marks: 2, unitNumber: 2 },
          { number: '1(c)', text: 'Compute the number of usable host addresses in a /26 IPv4 subnet.', marks: 2, unitNumber: 3 },
          { number: '1(d)', text: 'What is the role of ARP in an Ethernet LAN?', marks: 2, unitNumber: 3 },
          { number: '1(e)', text: 'Distinguish between TCP flow control and TCP congestion control.', marks: 2, unitNumber: 4 },
          { number: '1(f)', text: 'Why does DNS predominantly use UDP port 53 for standard queries?', marks: 2, unitNumber: 5 },
          { number: '1(g)', text: 'Briefly explain the purpose of digital certificates in HTTPS/TLS.', marks: 2, unitNumber: 5 },
        ],
      },
      {
        name: 'Section B — Protocol & Numerical Problems',
        instruction: 'Attempt any 3 of 5 questions (3 × 7 = 21 Marks).',
        questions: [
          { number: '2(a)', text: 'Generate the CRC codeword for message 1101011011 using generator polynomial x^4 + x + 1 and demonstrate receiver verification.', marks: 7, unitNumber: 2 },
          { number: '2(b)', text: 'Given network 192.168.10.0/24, divide it into 4 equal subnets and list Network ID, Subnet Mask, First/Last Usable IP, and Broadcast IP for each.', marks: 7, unitNumber: 3 },
          { number: '2(c)', text: 'Compare Go-Back-N ARQ and Selective Repeat ARQ with respect to window size limits and channel efficiency.', marks: 7, unitNumber: 2 },
          { number: '2(d)', text: 'Trace TCP three-way handshake and explain Slow Start, Congestion Avoidance (AIMD), and Fast Retransmit with a cwnd vs RTT graph.', marks: 7, unitNumber: 4 },
          { number: '2(e)', text: 'Explain recursive vs iterative DNS resolution and contrast HTTP/1.1 persistent connections with non-persistent HTTP.', marks: 7, unitNumber: 5 },
        ],
      },
      {
        name: 'Section C — Long Architecture Questions',
        instruction: 'Attempt 5 unit-wise questions (5 × 7 = 35 Marks).',
        questions: [
          { number: '3', text: 'Compare the 7-layer OSI reference model with the TCP/IP suite, detailing key responsibilities and PDU names at each layer.', marks: 7, unitNumber: 1 },
          { number: '4', text: 'Compare Pure ALOHA and Slotted ALOHA throughput efficiency and explain Ethernet frame structure.', marks: 7, unitNumber: 2 },
          { number: '5', text: 'Contrast RIP (Distance-Vector) and OSPF (Link-State) routing algorithms and explain the count-to-infinity problem.', marks: 7, unitNumber: 3 },
          { number: '6', text: 'Draw the TCP header format, explain sequence/acknowledgment numbers, and compare Leaky Bucket vs Token Bucket traffic shaping.', marks: 7, unitNumber: 4 },
          { number: '7', text: 'Explain the end-to-end working of SMTP, IMAP, and TLS handshake security guarantees for web communication.', marks: 7, unitNumber: 5 },
        ],
      },
    ],
  },
];
