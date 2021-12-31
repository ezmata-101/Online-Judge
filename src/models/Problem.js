class Problem {
    constructor(problemId, name, difficulty, category, timeLimit, memoryLimit, statement, input, output, tutorial) {
        this.problemId = problemId;
        this.name = name;
        this.difficulty = difficulty;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.category = category;
        this.statement = statement;
        this.input = input;
        this.output = output;
        this.tutorial = tutorial;
    }
    getAsJSON(){
        return {
            problemId: this.problemId,
            name: this.name,
            difficulty: this.difficulty,
            category: this.category,
            timeLimit: this.timeLimit,
            memoryLimit: this.memoryLimit,
            statement: this.statement,
            input: this.input,
            output: this.output,
            tutorial: this.tutorial
        }
    }
}
export default Problem;