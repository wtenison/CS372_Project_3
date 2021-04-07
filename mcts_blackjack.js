// Pseudocode for MCTS Blackjack Bot

// MCTS class
    // Variables
        // Root Game State
        // Max Search Iterations
        // Max Search Time
    // Functions
        // Rollout()
        // UpdateNodes()

        // Selection
        // Expansion
        // Simulation
        // Backpropogation
        
        // findNextMove() // Main function call 
    
// MCTS Game State (or Node) class
    // Variables
        // Blackjack Gamestate
        // Parent
        // Children
        // Available Moves ?
        // Number of Node Visits
        // Number of Wins

    // Functions
        // Calculate UCT
        // Set/Get Available Moves
        // Check if the tree is fully expanded
        // Get the Best Child Choice based on UCT
        // Get the Child with the best win score
