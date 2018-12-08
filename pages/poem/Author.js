export default ({ author }) => (
  <div>
    <h3>
      { author.name }
    </h3>
    <span>
      { author.dynasty }
      { author.birthYear && author.deathYear ? `（${author.birthYear}~${author.deathYear}）` : ''}
    </span>
    <p>{ author.intro }</p>
  </div>
)
