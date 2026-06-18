"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  X,
  BookOpen,
  TrendingUp,
  CalendarDays,
  Send,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import VersusFighterCard from "@/components/ui/VersusFighterCard";
import StatBar from "@/components/ui/StatBar";
import { matchups } from "@/data/stats";
import { formatDate } from "@/lib/utils";
import { VersusMatchup } from "@/types";
import { supabase } from "@/lib/supabase";

type Vote = {
  id: string;
  matchup_id: string;
  fighter_pick: string;
  created_at: string;
};

type FanComment = {
  id: string;
  matchup_id: string;
  username: string;
  comment: string;
  created_at: string;
};

function FanInteraction({ matchup }: { matchup: VersusMatchup }) {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [comments, setComments] = useState<FanComment[]>([]);
  const [selectedPick, setSelectedPick] = useState("");
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [loadingVote, setLoadingVote] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  const fighterAPick = matchup.fighterA.id;
  const fighterBPick = matchup.fighterC
    ? `${matchup.fighterB.id}-${matchup.fighterC.id}`
    : matchup.fighterB.id;

  const fighterBLabel = matchup.fighterC
    ? `${matchup.fighterB.name} & ${matchup.fighterC.name}`
    : matchup.fighterB.name;

  const voteStats = useMemo(() => {
    const total = votes.length;
    const fighterAVotes = votes.filter(
      (vote) => vote.fighter_pick === fighterAPick
    ).length;
    const fighterBVotes = votes.filter(
      (vote) => vote.fighter_pick === fighterBPick
    ).length;

    return {
      total,
      fighterAVotes,
      fighterBVotes,
      fighterAPercentage:
        total > 0 ? Math.round((fighterAVotes / total) * 100) : 0,
      fighterBPercentage:
        total > 0 ? Math.round((fighterBVotes / total) * 100) : 0,
    };
  }, [votes, fighterAPick, fighterBPick]);

  async function fetchVotes() {
    const { data } = await supabase
      .from("votes")
      .select("*")
      .eq("matchup_id", matchup.id)
      .order("created_at", { ascending: false });

    setVotes(data || []);
  }

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("matchup_id", matchup.id)
      .order("created_at", { ascending: false });

    setComments(data || []);
  }

  useEffect(() => {
    fetchVotes();
    fetchComments();
  }, [matchup.id]);

  async function handleVote() {
    if (!selectedPick) return;

    setLoadingVote(true);

    const { error } = await supabase.from("votes").insert({
      matchup_id: matchup.id,
      fighter_pick: selectedPick,
    });

    setLoadingVote(false);

    if (!error) {
      setSelectedPick("");
      fetchVotes();
    }
  }

  async function handleComment() {
    if (!username.trim() || !comment.trim()) return;

    setLoadingComment(true);

    const { error } = await supabase.from("comments").insert({
      matchup_id: matchup.id,
      username: username.trim(),
      comment: comment.trim(),
    });

    setLoadingComment(false);

    if (!error) {
      setComment("");
      fetchComments();
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h4 className="font-display text-lg font-bold uppercase text-white">
          Fan Prediction Vote
        </h4>

        <p className="mt-1 text-sm text-gray-400">
          Who do you think will win this fight?
        </p>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={() => setSelectedPick(fighterAPick)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              selectedPick === fighterAPick
                ? "border-primary bg-primary/20"
                : "border-white/10 bg-white/5 hover:border-primary/50"
            }`}
          >
            <p className="font-bold text-white">{matchup.fighterA.name}</p>
            <p className="text-xs text-gray-400">{matchup.fighterA.style}</p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPick(fighterBPick)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              selectedPick === fighterBPick
                ? "border-gold bg-gold/20"
                : "border-white/10 bg-white/5 hover:border-gold/50"
            }`}
          >
            <p className="font-bold text-white">{fighterBLabel}</p>
            <p className="text-xs text-gray-400">
              {matchup.fighterC ? "Team Handicap Side" : matchup.fighterB.style}
            </p>
          </button>
        </div>

        <button
          type="button"
          onClick={handleVote}
          disabled={!selectedPick || loadingVote}
          className="mt-5 w-full rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingVote ? "Voting..." : "Vote Now"}
        </button>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>{matchup.fighterA.name}</span>
              <span>{voteStats.fighterAPercentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${voteStats.fighterAPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>{fighterBLabel}</span>
              <span>{voteStats.fighterBPercentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${voteStats.fighterBPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-center text-xs uppercase tracking-wider text-gray-500">
            Total Votes: {voteStats.total}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-primary" />
          <h4 className="font-display text-lg font-bold uppercase text-white">
            Fan Discussion
          </h4>
        </div>

        <div className="mt-5 grid gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name..."
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-primary"
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={3}
            className="resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-primary"
          />

          <button
            type="button"
            onClick={handleComment}
            disabled={!username.trim() || !comment.trim() || loadingComment}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={16} />
            {loadingComment ? "Sending..." : "Send Comment"}
          </button>
        </div>

        <div className="mt-6 max-h-64 space-y-3 overflow-y-auto pr-1">
          {comments.length > 0 ? (
            comments.map((item) => (
              <div key={item.id} className="rounded-2xl bg-black/20 p-4">
                <p className="font-bold text-white">{item.username}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">
                  {item.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-black/20 p-4 text-center text-sm text-gray-500">
              No comments yet. Be the first fan to react.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Versus() {
  const [selectedMatchup, setSelectedMatchup] =
    useState<VersusMatchup | null>(null);

  return (
    <section id="versus" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2000&auto=format&fit=crop"
          alt="Arena background"
          fill
          className="object-cover object-center opacity-25"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <SectionHeading
        label="Fight Card"
        title="SanssHut Combat Night"
        description="Tap every fight card to reveal the storyline behind the battle."
      />

      <div className="space-y-28">
        {matchups.map((matchup, index) => {
          const { fighterA, fighterB, fighterC, eventName, date, prediction } =
            matchup;

          const isHandicap = Boolean(fighterC);

          return (
            <div key={matchup.id} className="relative">
              <button
                type="button"
                onClick={() => setSelectedMatchup(matchup)}
                className="group block w-full text-left"
              >
                <FadeIn className="mb-8 text-center">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-primary">
                    Fight #{index + 1}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-wide transition group-hover:text-primary sm:text-4xl">
                    {isHandicap ? "1 VS 2 Handicap Match" : "1 VS 1 Matchup"}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">{eventName}</p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <BookOpen size={14} />
                    Tap to reveal storyline
                  </div>
                </FadeIn>

                <div className="relative grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/50 hover:bg-primary/[0.03] sm:grid-cols-3 sm:gap-4 sm:p-6">
                  <FadeIn
                    direction="left"
                    className="order-1 flex justify-center sm:order-1 sm:justify-end"
                  >
                    <VersusFighterCard fighter={fighterA} align="left" />
                  </FadeIn>

                  <FadeIn className="order-3 flex justify-center sm:order-2">
                    <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40"
                      />

                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 25px rgba(232,19,31,0.5)",
                            "0 0 50px rgba(232,19,31,0.9)",
                            "0 0 25px rgba(232,19,31,0.5)",
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark sm:h-28 sm:w-28"
                      >
                        <span className="font-display text-2xl font-extrabold italic text-white sm:text-4xl">
                          VS
                        </span>
                      </motion.div>
                    </div>
                  </FadeIn>

                  <FadeIn
                    direction="right"
                    className="order-2 flex justify-center sm:order-3 sm:justify-start"
                  >
                    <div className="flex flex-col gap-4">
                      <VersusFighterCard fighter={fighterB} align="right" />
                      {fighterC && (
                        <VersusFighterCard fighter={fighterC} align="right" />
                      )}
                    </div>
                  </FadeIn>
                </div>
              </button>

              <FadeIn className="mt-14 mx-auto max-w-3xl">
                <div className="glass-card p-6 sm:p-8">
                  <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gold sm:text-xl">
                      {eventName}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays size={16} />
                      {formatDate(date)}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wider text-gray-300">
                    <TrendingUp size={18} className="text-primary" />
                    Win Probability Prediction
                  </div>

                  <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prediction.fighterAChance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light text-xs font-bold"
                    >
                      {prediction.fighterAChance}%
                    </motion.div>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prediction.fighterBChance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="flex items-center justify-center bg-gradient-to-r from-gold-dark to-gold text-xs font-bold text-charcoal"
                    >
                      {prediction.fighterBChance}%
                    </motion.div>
                  </div>

                  <div className="mt-2 flex justify-between gap-4 text-xs text-gray-400">
                    <span>{fighterA.name}</span>
                    <span className="text-right">
                      {fighterB.name}
                      {fighterC ? ` & ${fighterC.name}` : ""}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-gray-400">
                    {prediction.analysis}
                  </p>
                </div>
              </FadeIn>

              <FadeIn className="mt-12 mx-auto max-w-3xl">
                <div className="glass-card p-6 sm:p-8">
                  <h3 className="text-center font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
                    Fight <span className="text-gradient-red">Analytics</span>
                  </h3>

                  <p className="mt-2 text-center text-sm text-gray-400">
                    {fighterA.name} compared against {fighterB.name}
                  </p>

                  <div className="mt-6 flex flex-col divide-y divide-white/5">
                    <StatBar
                      label="Win Rate"
                      valueA={fighterA.stats.winRate}
                      valueB={fighterB.stats.winRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="KO Rate"
                      valueA={fighterA.stats.koRate}
                      valueB={fighterB.stats.koRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="Submission Rate"
                      valueA={fighterA.stats.submissionRate}
                      valueB={fighterB.stats.submissionRate}
                      maxValue={100}
                      unit="%"
                    />
                    <StatBar
                      label="Reach"
                      valueA={fighterA.stats.reach}
                      valueB={fighterB.stats.reach}
                      maxValue={250}
                      unit=" cm"
                    />
                    <StatBar
                      label="Height"
                      valueA={fighterA.stats.height}
                      valueB={fighterB.stats.height}
                      maxValue={220}
                      unit=" cm"
                    />
                    <StatBar
                      label="Age"
                      valueA={fighterA.stats.age}
                      valueB={fighterB.stats.age}
                      maxValue={50}
                      unit=" yrs"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>

      {selectedMatchup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-background p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedMatchup(null)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition hover:bg-primary"
            >
              <X size={20} />
            </button>

            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Fight Storyline
            </p>

            <h3 className="mt-3 pr-10 font-display text-2xl font-extrabold uppercase text-white sm:text-4xl">
              {selectedMatchup.title}
            </h3>

            <p className="mt-2 text-sm font-semibold text-gold">
              {selectedMatchup.eventName}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-center font-display text-sm font-bold uppercase tracking-wider text-gold">
                Tale of the Tape
              </h4>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-3 text-sm">
                <p className="font-semibold text-white">
                  {selectedMatchup.fighterA.name}
                </p>
                <p className="text-center text-xs uppercase tracking-wider text-gray-500">
                  Fighter
                </p>
                <p className="text-right font-semibold text-white">
                  {selectedMatchup.fighterB.name}
                  {selectedMatchup.fighterC
                    ? ` & ${selectedMatchup.fighterC.name}`
                    : ""}
                </p>

                <p>
                  {selectedMatchup.fighterA.record.wins}-
                  {selectedMatchup.fighterA.record.losses}-
                  {selectedMatchup.fighterA.record.draws}
                </p>
                <p className="text-center text-gray-500">Record</p>
                <p className="text-right">
                  {selectedMatchup.fighterB.record.wins}-
                  {selectedMatchup.fighterB.record.losses}-
                  {selectedMatchup.fighterB.record.draws}
                </p>

                <p>{selectedMatchup.fighterA.stats.height} cm</p>
                <p className="text-center text-gray-500">Height</p>
                <p className="text-right">
                  {selectedMatchup.fighterB.stats.height} cm
                </p>

                <p>{selectedMatchup.fighterA.stats.reach} cm</p>
                <p className="text-center text-gray-500">Reach</p>
                <p className="text-right">
                  {selectedMatchup.fighterB.stats.reach} cm
                </p>

                <p>{selectedMatchup.fighterA.stats.age}</p>
                <p className="text-center text-gray-500">Age</p>
                <p className="text-right">
                  {selectedMatchup.fighterB.stats.age}
                </p>

                <p>{selectedMatchup.fighterA.style}</p>
                <p className="text-center text-gray-500">Style</p>
                <p className="text-right">{selectedMatchup.fighterB.style}</p>
              </div>

              {selectedMatchup.fighterC && (
                <p className="mt-4 rounded-xl bg-primary/10 p-3 text-center text-xs leading-relaxed text-gray-300">
                  Handicap note: fighter B side includes{" "}
                  <span className="font-bold text-gold">
                    {selectedMatchup.fighterB.name}
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-gold">
                    {selectedMatchup.fighterC.name}
                  </span>
                  .
                </p>
              )}
            </div>

            <div className="mt-6 space-y-5 text-gray-300">
              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Why This Fight Happened
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {selectedMatchup.storyline}
                </p>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Fight Tension
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {selectedMatchup.tension}
                </p>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Prediction Analysis
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {selectedMatchup.prediction.analysis}
                </p>
              </div>
            </div>

            <FanInteraction matchup={selectedMatchup} />

            <button
              type="button"
              onClick={() => setSelectedMatchup(null)}
              className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
            >
              Close Storyline
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}