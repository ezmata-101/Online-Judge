class Submission {
    constructor(submissionId, submissionTime, language, verdict, time, memory, statement, attemptedBy, attemptedFor) {
        this.submissionId = submissionId;
        this.submissionTime = submissionTime;
        this.language = language;
        this.time = time;
        this.memory = memory;
        this.verdict = verdict;
        this.statement = statement;
        this.attemptedBy = attemptedBy;
        this.attemptedFor = attemptedFor;
    }
    getAsJSON(){
        return {
            submissionId: this.submissionId,
            submissionTime: this.submissionTime,
            language: this.language,
            verdict: this.verdict,
            time: this.time,
            memory: this.memory,
            statement: this.statement,
            attemptedBy: this.attemptedBy,
            attemptedFor: this.attemptedFor
        }
    }
}
export default Submission;