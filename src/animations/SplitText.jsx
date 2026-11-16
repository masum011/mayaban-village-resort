import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function SplitText({
  text,
  as = 'h1',
  className = '',
  delay = 0.1,
  immediate = false,
  highlightWords = [],
  highlightClassName = '',
}) {
  const prefersReduced = useReducedMotion();
  const Tag = as;
  const words = text.split(' ');
  const isHighlighted = (word) => highlightWords.includes(word);

  if (prefersReduced) {
    return (
      <Tag className={className}>
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className={isHighlighted(word) ? highlightClassName : ''}>
            {word}
            {idx < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={{ textWrap: 'balance' }}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom mr-[0.26em]">
          <m.span
            className={`inline-block ${isHighlighted(word) ? highlightClassName : ''}`}
            initial={{ y: '105%', opacity: 0 }}
            {...(immediate
              ? { animate: { y: '0%', opacity: 1 } }
              : {
                  whileInView: { y: '0%', opacity: 1 },
                  viewport: { once: true, amount: 0.4 },
                })}
            transition={{
              duration: 0.72,
              delay: delay + idx * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
