class Submission {
    constructor(submissionId, submissionTime, language, verdict, time, memory, attemptedBy, attemptedFor, submittedFile) {
        this.submissionId = submissionId;
        this.submissionTime = submissionTime;
        this.language = language;
        this.time = time;
        this.memory = memory;
        this.verdict = verdict;
        this.attemptedBy = attemptedBy;
        this.attemptedFor = attemptedFor;
        this.submittedFile = submittedFile;
    }
    getAsJSON(){
        return {
            submissionId: this.submissionId,
            submissionTime: this.submissionTime,
            language: this.language,
            verdict: this.verdict,
            time: this.time,
            memory: this.memory,
            attemptedBy: this.attemptedBy,
            attemptedFor: this.attemptedFor,
            submittedFile: this.submittedFile
        }
    }
}
export default Submission;