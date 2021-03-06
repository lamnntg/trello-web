export const initialData = {
  board: [
    {
      id: 'board-1',
      columnOrder: ['column-3', 'column-2', 'column-1'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'Todo column',
          cardOrder: ['card-7', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-1'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 1',
              cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 5',
              cover: null
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 6',
              cover: null
            },
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'title card 7',
              cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Process Column',
          cardOrder: ['card-8', 'card-9', 'card-10'],
          card: [
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'title card 8',
              cover: null
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'title card 9',
              cover: null
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'title card 10',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Todo column 3',
          cardOrder: ['card-11', 'card-12', 'card-13'],
          card: [
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'title card 11',
              cover: null
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'title card 12',
              cover: null
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'title card 13',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}