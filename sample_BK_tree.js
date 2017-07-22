var sample_T = {
  val: 'some', 
  children: [
    { dist: 1, 
      subT: {
        val: 'same', children: []
      }
    },
    { dist: 2, 
      subT: {
        val: 'soft', 
        children: [
          { dist: 2,
            subT: {
              val: 'soda', children: []
            }
          },
          { dist: 3,
            subT: {
              val: 'mole', children: []
            }
          }
       ]
      }
    },
    { dist: 4, 
      subT: {
        val: 'salmon', children: []
      }
    }
  ]
};
