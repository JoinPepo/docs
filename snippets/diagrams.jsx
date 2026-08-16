/*
 * Hand-authored SVG diagrams.
 *
 * Why components rather than mermaid or inline SVG:
 *  - Mermaid renders but looks like tool output, and `flowchart TD` fails silently.
 *  - Inline <svg> in MDX is stripped by Mintlify, in both JSX and plain-HTML form.
 *  - A named-export component in /snippets/ renders SVG fine and gives full
 *    control of type, spacing and colour.
 *
 * Constraints learned the hard way, both silent failures:
 *  - Each diagram must be ONE self-contained exported component. Helper
 *    sub-components defined in this file are not resolved at render time.
 *  - No <foreignObject>; Mintlify's CDN strips it.
 *
 * Theming: neutral elements use `currentColor` at low opacity, so one drawing
 * works on light and dark grounds. ACCENT is a mid-tone teal that reads on
 * both — the brand's #264548 vanishes on dark and #7FD4C8 washes out on light.
 * Reserve it for the one element the diagram is actually about.
 */

export const CorpusFlow = () => {
  const stages = [
    {
      n: '1',
      title: 'Your accounts + discovery queries',
      desc: 'What you own, plus what your brand profile says to search for',
    },
    {
      n: '2',
      title: 'Collection run',
      desc: 'Reads your timelines and runs the discovery queries',
    },
    {
      n: '3',
      title: 'Name match',
      desc: 'A search hit only counts if it is genuinely about your brand',
    },
    {
      n: '4',
      title: 'Your corpus',
      desc: 'Posts, creators, captions, comments',
      accent: true,
    },
    {
      n: '5',
      title: 'Metric history',
      desc: 'Re-observed every 4h, then 8h, then daily',
    },
  ]
  const top = (i) => 10 + i * 96

  return (
    <figure style={{ margin: '1.75rem 0' }}>
      <svg
        viewBox="0 0 720 476"
        role="img"
        aria-label="How a post enters your corpus: your accounts and discovery queries feed a collection run; hits are name-matched before they count; matched posts become your corpus; and each post is re-observed over time to build the metric history behind every momentum score."
        style={{ width: '100%', height: 'auto' }}
      >
        {stages.slice(0, -1).map((s, i) => (
          <line
            key={`spine-${s.n}`}
            x1="44"
            y1={top(i) + 45}
            x2="44"
            y2={top(i + 1) + 15}
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
        ))}
        {stages.map((s, i) => (
          <g key={s.n}>
            <circle
              cx="44"
              cy={top(i) + 30}
              r="13"
              fill={s.accent ? '#4FB3A0' : 'currentColor'}
              fillOpacity={s.accent ? 0.18 : 0.07}
              stroke={s.accent ? '#4FB3A0' : 'currentColor'}
              strokeOpacity={s.accent ? 0.6 : 0.22}
            />
            <text
              x="44"
              y={top(i) + 35}
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.75"
              fontSize="12"
            >
              {s.n}
            </text>
            <rect
              x="96"
              y={top(i)}
              width="560"
              height="60"
              rx="12"
              fill={s.accent ? '#4FB3A0' : 'currentColor'}
              fillOpacity={s.accent ? 0.1 : 0.04}
              stroke={s.accent ? '#4FB3A0' : 'currentColor'}
              strokeOpacity={s.accent ? 0.5 : 0.14}
            />
            <text
              x="118"
              y={top(i) + 27}
              fill="currentColor"
              fontSize="16"
              fontWeight="600"
            >
              {s.title}
            </text>
            <text
              x="118"
              y={top(i) + 46}
              fill="currentColor"
              fillOpacity="0.62"
              fontSize="13.5"
            >
              {s.desc}
            </text>
          </g>
        ))}
        <path
          d={`M 660 ${top(2) + 30} h 22`}
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="3 3"
          fill="none"
        />
        <text
          x="688"
          y={top(2) + 34}
          fill="currentColor"
          fillOpacity="0.45"
          fontSize="12"
        >
          drop
        </text>
      </svg>
      <figcaption style={{ fontSize: '0.8125rem', opacity: 0.6, marginTop: '0.5rem' }}>
        Two inputs, one filter, and a corpus that keeps being re-read. The last
        step is what makes trend detection possible at all.
      </figcaption>
    </figure>
  )
}

// ---------------------------------------------------------------------------

/**
 * The claim this has to make: the observation gate runs BEFORE the score
 * bands, and overrides them. Two lanes make that visible in a way a table
 * cannot — the top lane never reaches the bands at all.
 */
export const TrendingDecision = () => (
  <figure style={{ margin: '1.75rem 0' }}>
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="A video with fewer than three observations across twelve hours is capped at watchlist regardless of its score. Only a video with enough observation history reaches the score bands, which can return watchlist, trending or breakout."
      style={{ width: '100%', height: 'auto' }}
    >
      {/* lane 1 — gated */}
      <rect x="8" y="16" width="704" height="112" rx="14" fill="currentColor" fillOpacity="0.03" />
      <text x="32" y="46" fill="currentColor" fillOpacity="0.5" fontSize="12" letterSpacing="0.08em">
        UNDER 3 OBSERVATIONS, OR UNDER 12 HOURS
      </text>
      <rect x="32" y="60" width="230" height="48" rx="11" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.16" />
      <text x="52" y="90" fill="currentColor" fontSize="15">One video</text>
      <path d="M 274 84 h 76" stroke="currentColor" strokeOpacity="0.3" fill="none" />
      <path d="M 350 84 l -9 -5 v 10 z" fill="currentColor" fillOpacity="0.3" />
      <rect x="362" y="60" width="200" height="48" rx="11" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 3" />
      <text x="382" y="90" fill="currentColor" fillOpacity="0.75" fontSize="15">watchlist</text>
      <text x="578" y="90" fill="currentColor" fillOpacity="0.45" fontSize="12.5">whatever it scores</text>

      {/* lane 2 — scored */}
      <rect x="8" y="152" width="704" height="152" rx="14" fill="#4FB3A0" fillOpacity="0.05" />
      <text x="32" y="182" fill="#4FB3A0" fontSize="12" letterSpacing="0.08em">
        3+ OBSERVATIONS ACROSS 12+ HOURS
      </text>
      <rect x="32" y="196" width="230" height="48" rx="11" fill="#4FB3A0" fillOpacity="0.12" stroke="#4FB3A0" strokeOpacity="0.5" />
      <text x="52" y="226" fill="currentColor" fontSize="15">Scored vs comparable</text>
      <path d="M 274 220 h 76" stroke="#4FB3A0" strokeOpacity="0.6" fill="none" />
      <path d="M 350 220 l -9 -5 v 10 z" fill="#4FB3A0" fillOpacity="0.6" />
      <rect x="362" y="196" width="118" height="48" rx="11" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.18" />
      <text x="382" y="226" fill="currentColor" fillOpacity="0.75" fontSize="15">watchlist</text>
      <rect x="490" y="196" width="106" height="48" rx="11" fill="#4FB3A0" fillOpacity="0.12" stroke="#4FB3A0" strokeOpacity="0.45" />
      <text x="510" y="226" fill="currentColor" fontSize="15">trending</text>
      <rect x="606" y="196" width="106" height="48" rx="11" fill="#4FB3A0" fillOpacity="0.2" stroke="#4FB3A0" strokeOpacity="0.7" />
      <text x="626" y="226" fill="currentColor" fontSize="15">breakout</text>
      <text x="32" y="278" fill="currentColor" fillOpacity="0.5" fontSize="12.5">
        Which band depends on rank in the comparison group and lift over the creator&apos;s own normal.
      </text>
    </svg>
    <figcaption style={{ fontSize: '0.8125rem', opacity: 0.6, marginTop: '0.5rem' }}>
      Only the lower lane is ever scored.
    </figcaption>
  </figure>
)

// ---------------------------------------------------------------------------

/** Why a balance can dip mid-call and recover. */
export const CreditLifecycle = () => {
  const steps = [
    { t: 'Estimate', d: 'Counts the posts your call will read' },
    { t: 'Hold', d: 'Reserves that amount before any work' },
    { t: 'Work', d: 'Runs, stopping at your ceiling' },
    { t: 'Settle', d: 'Charges actual, refunds the rest' },
  ]
  return (
    <figure style={{ margin: '1.75rem 0' }}>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label="A call is estimated, the estimate is held against your balance, the work runs, and settlement charges the actual cost and refunds the difference. If the hold exceeds your balance the call is refused and nothing is charged."
        style={{ width: '100%', height: 'auto' }}
      >
        {steps.map((s, i) => (
          <g key={s.t}>
            <rect
              x={8 + i * 180}
              y="40"
              width="156"
              height="76"
              rx="12"
              fill={i === 1 ? '#4FB3A0' : 'currentColor'}
              fillOpacity={i === 1 ? 0.1 : 0.04}
              stroke={i === 1 ? '#4FB3A0' : 'currentColor'}
              strokeOpacity={i === 1 ? 0.5 : 0.14}
            />
            <text x={28 + i * 180} y="70" fill="currentColor" fontSize="16" fontWeight="600">
              {s.t}
            </text>
            <text x={28 + i * 180} y="92" fill="currentColor" fillOpacity="0.6" fontSize="12.5">
              {s.d.length > 30 ? s.d.slice(0, 30) : s.d}
            </text>
            {i < 3 && (
              <g>
                <path d={`M ${168 + i * 180} 78 h 16`} stroke="currentColor" strokeOpacity="0.3" fill="none" />
                <path d={`M ${186 + i * 180} 78 l -8 -4.5 v 9 z`} fill="currentColor" fillOpacity="0.3" />
              </g>
            )}
          </g>
        ))}
        <path d="M 96 128 v 34 h 300" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="4 3" fill="none" />
        <path d="M 398 162 l -9 -5 v 10 z" fill="currentColor" fillOpacity="0.28" />
        <rect x="410" y="140" width="300" height="46" rx="11" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.16" strokeDasharray="4 3" />
        <text x="430" y="169" fill="currentColor" fillOpacity="0.7" fontSize="14">
          Not enough credit → refused, nothing charged
        </text>
        <text x="8" y="220" fill="currentColor" fillOpacity="0.5" fontSize="12.5">
          Because the hold happens first, a balance read mid-call can be lower than the eventual charge.
        </text>
      </svg>
      <figcaption style={{ fontSize: '0.8125rem', opacity: 0.6, marginTop: '0.5rem' }}>
        Reserve, work, settle. You are never billed above the ceiling you were quoted.
      </figcaption>
    </figure>
  )
}

// ---------------------------------------------------------------------------

/** Setup order, with the step that gates everything below it marked. */
export const SetupOrder = () => {
  const steps = [
    { n: '1', t: 'Get a key', d: 'Issued with your base URL' },
    { n: '2', t: 'Check your balance', d: 'Free — confirms the key works' },
    { n: '3', t: 'Create your brand profile', d: 'Every workflow reads it', accent: true },
    { n: '4', t: 'Price the call', d: 'Free — the estimate matches the invoice' },
    { n: '5', t: 'Ask', d: 'Answer, evidence and cost come back together' },
  ]
  const top = (i) => 10 + i * 74
  return (
    <figure style={{ margin: '1.75rem 0' }}>
      <svg
        viewBox="0 0 720 380"
        role="img"
        aria-label="Setup order: get a key, check your balance, create your brand profile, price the call, then ask. The brand profile gates every workflow call."
        style={{ width: '100%', height: 'auto' }}
      >
        {steps.slice(0, -1).map((s, i) => (
          <line
            key={`spine-${s.n}`}
            x1="44"
            y1={top(i) + 39}
            x2="44"
            y2={top(i + 1) + 9}
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
        ))}
        {steps.map((s, i) => (
          <g key={s.n}>
            <circle
              cx="44"
              cy={top(i) + 24}
              r="13"
              fill={s.accent ? '#4FB3A0' : 'currentColor'}
              fillOpacity={s.accent ? 0.18 : 0.07}
              stroke={s.accent ? '#4FB3A0' : 'currentColor'}
              strokeOpacity={s.accent ? 0.6 : 0.22}
            />
            <text x="44" y={top(i) + 29} textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="12">
              {s.n}
            </text>
            <rect
              x="96"
              y={top(i)}
              width="560"
              height="48"
              rx="12"
              fill={s.accent ? '#4FB3A0' : 'currentColor'}
              fillOpacity={s.accent ? 0.1 : 0.04}
              stroke={s.accent ? '#4FB3A0' : 'currentColor'}
              strokeOpacity={s.accent ? 0.5 : 0.14}
            />
            <text x="118" y={top(i) + 30} fill="currentColor" fontSize="16" fontWeight={s.accent ? '600' : '500'}>
              {s.t}
            </text>
            <text x="634" y={top(i) + 30} textAnchor="end" fill="currentColor" fillOpacity="0.55" fontSize="13">
              {s.d}
            </text>
          </g>
        ))}
      </svg>
      <figcaption style={{ fontSize: '0.8125rem', opacity: 0.6, marginTop: '0.5rem' }}>
        Step 3 gates everything below it — workflow calls are refused until a
        brand profile exists.
      </figcaption>
    </figure>
  )
}
