class Contest{
    constructor(creator, contestId, participants, announcement, startTime, endTime, problems) {
        this.creator = creator;
        this.contestId = contestId;
        this.participants = participants;
        this.startTime = startTime;
        this.endTime = endTime;
        this.announcement = announcement;
        this.problems = problems;
    }
    getAsJSON(){
        return {
            creator: this.creator,
            contestId: this.contestId,
            participants: this.participants,
            announcement: this.announcement,
            startTime: this.startTime,
            endTime: this.endTime,
            problems: this.problems
        }
    }
}
export default Contest;