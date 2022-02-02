There are ***n*** cities and ***m*** roads between them. Your task is to process ***q*** queries where you have to determine the length of the shortest route between two given cities.

### Input

The first input line has three integers ***n, m*** and ***q***: the number of cities, roads, and queries.

Then, there are ***m*** lines describing the roads. Each line has three integers ***a, b*** and ***c***: there is a road between cities a and b whose length is ***c***. All roads are two-way roads.

Finally, there are q lines describing the queries. Each line has two integers ***a*** and ***b***: determine the length of the shortest route between cities ***a*** and ***b***.

### Output

Print the length of the shortest route for each query. If there is no route, print ***−1*** instead.

### Constraints
* 1 ≤ n ≤500
* 1 ≤ m ≤ n2
* 1 ≤ q ≤105
* 1 ≤ a,b ≤ n
* 1 ≤ c ≤109