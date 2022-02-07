import copy

board = [[8, 0, 0, 6, 4, 7, 9, 0, 3], [0, 0, 0, 0, 0, 2, 7, 5, 6], [6, 0, 0, 5, 0, 0, 8, 2, 4], [4, 7, 8, 9, 5, 1, 0, 0, 0], [
    0, 6, 9, 0, 0, 4, 5, 7, 1], [0, 1, 3, 0, 2, 6, 4, 0, 8], [0, 4, 6, 0, 0, 0, 0, 8, 5], [3, 8, 0, 2, 0, 0, 6, 4, 0], [7, 0, 0, 4, 0, 0, 0, 3, 0]]

# check if board is solved, returns a boolean
def solved(board):
    for row in board:
        if 0 in row:
            return False
    return True

# print board
def printb(board):
    for row in board:
        print(row)

# inputs board
# gives a solved board
def solve(board):
    tries = [copy.deepcopy(board)]
    q = 0
    while not solved(tries[0]):
        q += 1
        y, x = find_empty(tries[0])
        for n in range(9):
            n += 1
            if basic_check(tries[0], y, x, n) and backtrack_check(tries, y, x, n):
                tries[0][y][x] = n
                break
            elif n == 9:
                if tries[0] == board:
                    print("its backtracked to original")
                    exit()
                tries.insert(0, copy.deepcopy(board))
                break
    print("solved", q, "rounds")
    printb(tries[0])

# put into try board
# if dont work get new board
def find_empty(board):
    for y in range(9):
        for x in range(9):
            if board[y][x] == 0:
                return y, x

# row, column, box
def basic_check(board, y, x, n):
    if n in board[y]:
        return False
    for row in board:
        if row[x] == n:
            return False
    if y/3 < 1:
        ybox = [0, 1, 2]
    elif y/3 < 2:
        ybox = [3, 4, 5]
    else:
        ybox = [6, 7, 8]
    if x/3 < 1:
        xbox = [0, 1, 2]
    elif x/3 < 2:
        xbox = [3, 4, 5]
    else:
        xbox = [6, 7, 8]

    for i in ybox:
        for c in xbox:
            if n == board[i][c]:
                return False
    return True

# check if board is in history
def backtrack_check(tries, y, x, n):
    testcopy = copy.deepcopy(tries[0])
    testcopy[y][x] = n
    if testcopy in tries:
        return False
    return True

solve(board)