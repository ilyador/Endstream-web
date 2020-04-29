export default {
  gameId: 'hv34t3',
  streams: {
    player1: {
      1800: {
        agenda: 'ms',
        operators: [
          {
            player: 'player1',
            id: 'Mori-the-Piercer'
          },
          {
            player: 'player1',
            id: 'Ben-Storm'
          }
        ]
      },
      1900: {
        agenda: 'mp',
        operators: [
          {
            player: 'player1',
            id: 'Disruptor'
          },
          {
            player: 'player2',
            id: 'Dr-Koh'
          }
        ]
      },
      2000: {
        agenda: 'pm'
      },
      2100: {
        agenda: 'ps',
        hideouts: [
          {
            player: 'player1',
            id: 'SSV-93-Ural'
          }
        ]
      },
      2200: {
        agenda: 'sm'
      },
      2300: {
        agenda: 'sp',
        operators: [
          {
            player: 'player2',
            id: 'Captain-Shortspear'
          }
        ]
      }
    },
    player2: {
      1800: {
        agenda: 'pm',
        operators: [
          {
            player: 'player2',
            id: 'The-Gray-Baron'
          }
        ]
      },
      1900: {
        agenda: 'sm'
      },
      2000: {
        agenda: 'ms',
        operators: []
      },
      2100: {
        agenda: 'ps',
        operators: [
          {
            player: 'player2',
            id: 'Mr-Archangel'
          },
          {
            player: 'player2',
            id: 'Dr-Archangel'
          },
          {
            player: 'player1',
            id: 'Soren-Glasskin'
          }
        ]
      },
      2200: {
        agenda: 'ps'
      },
      2300: {
        agenda: 'mp'
      }
    },
    outerworld: {
      2100: {
        hideouts: [
          {
            player: 'player2',
            id: 'Avalon'
          }
        ],
        operators: [
          {
            player: 'player2',
            id: 'Sourayah'
          }
        ]
      }
    }
  }
}
