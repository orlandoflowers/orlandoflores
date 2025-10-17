export function BooksPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Books</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-xl text-muted-foreground mb-8">
            Discover the books that have shaped my perspective on design, technology, and creativity.
          </p>
          <div className="grid gap-8 md:gap-12">
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Reading List</h2>
              <p className="text-muted-foreground">
                I'm curating a collection of recommended books for designers and developers. 
                This section will feature reviews, insights, and key takeaways from influential works in our field.
              </p>
            </section>
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Book Reviews</h2>
              <p className="text-muted-foreground">
                Coming soon: In-depth reviews and analysis of books that have influenced my work and thinking.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
