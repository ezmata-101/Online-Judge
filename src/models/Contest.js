class Contest{
    constructor(creator, contestId, participants, announcement, startTime, duration, problems) {
        this.creator = creator;
        this.contestId = contestId;
        this.participants = participants;
        this.startTime = startTime;
        this.duration = duration;
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
            duration: this.duration,
            problems: this.problems
        }
    }
}
export default Contest;