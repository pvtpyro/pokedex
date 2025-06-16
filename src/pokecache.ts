import { T } from "vitest/dist/chunks/reporters.d.DL9pg5DB";

export type CacheEntry<T> = {
    createdAt: number;
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, { createdAt: Date.now(), val });
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        return entry ? entry.val : undefined;
    }

    // delete any entries that are older than the interval. 
    // It should loop through the cache and delete any entries that are older than Date.now() - this.#interval.
    #reap() {
        for (const [key, entry] of this.#cache.entries()) {
            if(Date.now() - this.#interval > entry.createdAt) {
                this.#cache.delete(key);
            }
            // if (Date.now() - entry.createdAt > this.#interval) {
            //     this.#cache.delete(key);
            // }
        }
    }

    // Create a #startReapLoop() method that uses setInterval() to call this.#reap() after a delay of this.#interval and store the interval ID in this.#reapIntervalID.
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    // Create a public (non-#) stopReapLoop() method that uses clearInterval() to stop the reap loop and set this.#reapIntervalID back to undefined.
    stopReapLoop() {
        if(this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}