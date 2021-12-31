import Header from "./component/layout/Header";
import ProblemPage from "./component/problem/ProblemPage";

function App() {
    const problem = {
        problemId: 'c1p1',
        name: 'Shortest Path',
        difficulty: 1200,
        category: ['Graph Theory', 'Shortest Path', 'All pair Shortest Path'],
        timeLimit: 2,
        memoryLimit: 256,
        statement: 'demo.md',
        input: 'demo_input.txt',
        output: 'demo_output.txt',
        tutorial: 'null'
    }
  return (
    <div className="App">
      <Header/>
        <ProblemPage problem={problem}/>
    </div>
  );
}

export default App;
