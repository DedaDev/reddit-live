import EventEmitter from "events";
import Snoowrap, { SnoowrapOptions } from "snoowrap";

export default class RedditStreamer extends Snoowrap {
    private lastChecked: number; 
    stream: EventEmitter;
    constructor(options: SnoowrapOptions, subreddits: string[], poolTime = 20) {
        super(options);
        this.lastChecked = new Date().getTime();
        this.stream = new EventEmitter();

        setInterval(async () => {
            try {
                const submissions = await this.getNew(subreddits.join("+"));
                const newSubmissions = submissions.filter((submission) => submission.created_utc * 1000 > this.lastChecked);
                newSubmissions.forEach((submission) => {
                    this.stream.emit("item", submission);
                });
                this.refreshTimestamp();
            } catch (err) {
                this.stream.emit("error", err);
            }
        }, poolTime * 10000);
    }

    private refreshTimestamp() {
        this.lastChecked = new Date().getTime();
    }
}
