export default ({ author }) => (
  <div>
    <style>{`
      .author {
        font-size: 1.1em; 
      } 
    `}</style>
    <h3>
      { author.name }
    </h3>
    <span className="author">
      { author.dynasty }
      { author.birthYear && author.deathYear ? `（${author.birthYear}~${author.deathYear}）` : ''}
    </span>
    <p>{ author.intro }</p>
  </div>
)
