declare namespace Backend {
  type Shelf = 'read' | 'wantToRead' | 'currentlyReading' | 'none'

  interface Book {
    id: string
    title: string
    allowAnonLogging: boolean
    authors: Array<string> | null
    canonicalVolumeLink: string
    categories: Array<string>
    contentVersion: string
    description: string
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
    industryIdentifiers: Array<{
      identifier: string
      type: string
    }>
    infoLink: string
    language: string | 'en'
    maturityRating: 'NOT_MATURE' | 'MATURE'
    pageCount: number
    panelizationSummary: {
      containsEpubBubbles: boolean
      containsImageBubbles: boolean
    }
    previewLink: string
    printType: string
    publishedDate: string
    publisher: string
    readingModes: {
      image: boolean
      text: boolean
    }
    shelf: Shelf
    subtitle: string
  }
}
