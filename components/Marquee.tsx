import { Fragment } from 'react';
import { site } from '@/data/site';

export default function Marquee() {
  return (
    <div className="strip">
      <div>
        {Array.from({ length: 4 }, (_, k) =>
          site.marquee.map((t) => <Fragment key={k + t}>{t}<span>✦</span></Fragment>)
        )}
      </div>
    </div>
  );
}
