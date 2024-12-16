# Train of Thought

I’m using ChatGPT’s free version to speed up the development process, though I still need to be precise with the prompts I provide. I began by outlining the task, instructing the AI to use Tailwind, lucide-react, and @tanstack/react-query as the core technologies.

Initially, I focused on toggling between the list and grid views. Once that feature was functional, I moved on to styling the layout and organizing the Product component for both grid and list formats. While these layouts are quite similar, I didn’t prioritize breaking them into smaller, reusable components at this stage.

After reviewing the project structure and seeing that absolute import paths were being used, I decided to clean up my imports and organize the components into dedicated folders: Layout, Product, and ProductGrid. I also created a types.ts file in the utils folder to define a Product type, which was reused in multiple places as props. While I'm not a fan of prop drilling, it was minimal in this case—just a small amount of passing data from ProductGrid to the layout components.

## Infinite Scroll Pagination

The next challenge was to implement infinite scroll pagination. However, as I was also being evaluated on the user experience of interactive elements, I wasn’t convinced that infinite scroll was the best choice. While it offers a seamless user experience by allowing users to scroll indefinitely through content (similar to the experience on Instagram, where users get lost in endless posts and reels), there are some serious drawbacks.

### Considerations for Accessibility

From an accessibility standpoint, infinite scroll can be problematic for keyboard users and screen readers. When users rely on these tools, infinite scroll can make navigation difficult and hinder their ability to access content. For users who might have a disability, this can make it frustrating to interact with the page, as they don’t have the control they need to navigate back to content they previously viewed. Instead of using pagination, users are forced to scroll through all the content again to find something they liked, which isn’t ideal.

Furthermore, performance issues arise as well. While infinite scrolling might improve engagement by keeping users on the page longer, it can also cause performance problems when the content loads continuously. This can impact users’ overall experience, especially for those with slower devices or connectivity.

Even though infinite scroll could be mitigated with well-written code and solid structure, I still believe the tradeoff isn’t worth it when considering the experience for users with accessibility needs. The web should be accessible to everyone, whether or not they have a disability.

Alternative Approach: How I Would Implement Infinite Scroll
That being said, if I were to implement infinite scroll, here's a basic approach I would take, even though I’m personally not a fan due to the aforementioned reasons:

### 1. Replace useQuery with useInfiniteQuery

The first step would be to switch from useQuery to useInfiniteQuery to enable infinite scrolling:

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isError,
  error,
  isFetchingNextPage,
} = useInfiniteQuery<ProductType[], Error>({
  queryKey: ['products'],
  queryFn: ({ pageParam = 0 }) =>
    SDK.getAllProducts({ limit: 10, offset: pageParam }),
  getNextPageParam: (lastPage, pages) => {
    return lastPage.length === 10 ? pages.length * 10 : undefined
  },
})
```

### 2. Add Event Listener for Scrolling

I would need to track when the user reaches the end of the currently loaded products to trigger the next batch of data. For accessibility, I would add aria-live="polite" to the wrapper of the product list, which would notify screen readers that new content is being loaded.

This would be the event handler for listening to scroll events:

```tsx
useEffect(() => {
  const loadMoreElement = loadMoreRef.current
  if (loadMoreElement) {
    loadMoreElement.addEventListener('scroll', handleScroll)
    return () => {
      loadMoreElement.removeEventListener('scroll', handleScroll)
    }
  }
}, [hasNextPage, isFetchingNextPage])
```

### 3. Handle Scrolling and Ref the Container

I would also add a ref to the product container element to track the scroll position, and load new products when the user reaches the bottom:

```tsx
const loadMoreRef = useRef<HTMLDivElement | null>(null)

const handleScroll = () => {
  if (loadMoreRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = loadMoreRef.current
    if (
      scrollHeight - scrollTop === clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }
}
```

Finally, I would apply this ref to the wrapper of the product list, which changes based on the view type (grid or list):

```tsx
<div
  className={`${
    view === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      : 'flex flex-col gap-6'
  }`}
  ref={loadMoreRef}
>
  ... map
</div>
```

### 4. Create a Separate Component

To keep things modular, I would add the complete implementation to a new component called ProductGridWithInfiniteScroll.

## In a alternative univers

Over the past few hours, I have come to realize that fully understanding the existing setup, how it functions, and the details of the assignment within such a short period—2-3 hours—has proven to be extremely challenging. While it is possible to complete the task in this time frame, I am not entirely satisfied with the results. Unfortunately, due to low energy and time constraints this week, I have done my best with the resources available to me. However, I would like to take a moment to reflect on how I would approach this differently given more time and energy.

### Improvements I Would Have Made

First, I would have liked to work more with Radix UI primitives from the outset. These components provide built-in accessibility and functionality, but they are unstyled by default. Even though I am relatively new to Tailwind CSS, I likely still would have chosen to use it due to the challenges it offers. However, another approach I might have considered would be to use CSS modules, which would have allowed me to maintain complete control over the styling while keeping the code easy to read and transparent—no hidden complexities.

Beyond styling, I would have devoted more time to typing and to dividing components into smaller, more reusable units. I believe splitting components into smaller, named pieces increases readability and understanding. One such outbreaking of html/jsx structure would be the Rating component which was identical in both layouts. A well-structured codebase should allow the developer to understand the larger picture just by looking at the names and organization of the components, rather than getting lost in nested divs and styling details. I consider the naming of components to be vital for the overall clarity of the project.

### React Context and Third-Party Libraries

Personally, I prefer using React Context as a solution for state management. While I have encountered alternatives such as Jotai, I have not yet had the opportunity to work with them. I generally try to avoid introducing too many third-party libraries unless there is a clear advantage, as I prefer to keep the project simple and manageable. That being said, I recognize that there are situations where leveraging established solutions is more efficient than reinventing the wheel. In this case, I would have likely used React's built-in Context to manage the cart state and notifications, the latter of which I would have handled with a toast notification component, such as the one offered by Radix UI.

### The Role of AI in My Development Process

I must also acknowledge the role of AI in my development process. I rely heavily on AI tools to source information, brainstorm ideas, and explore improvements. While some may view this as a sign of weakness or dependency, I see it as an effective strategy for utilizing all available tools at my disposal. I maintain a healthy skepticism toward the output generated by AI, carefully assessing what makes sense and following good coding practices. In my daily routine, I affectionately refer to AI as my "desk rubber duck"—a fitting term, as it provides valuable feedback (unlike my actual rubber ducks, which remain delightfully silent).

### Conclusion

Although I haven’t had the opportunity to dive deeply into Challenge 2 yet, I would approach it in much the same way as I did Challenge 1, using the same methodology and best practices outlined above. Unfortunatly I ran out of time and energy due to a high work load before Christmas code freezes, a scheduled move to a house this week/weekend.
