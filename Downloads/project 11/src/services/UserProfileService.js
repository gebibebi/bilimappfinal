// UserProfileService.js
// This file contains service functions for managing user profiles and subscriptions

// Import mock profiles data
import MOCK_USER_PROFILES from '../data/mockUserProfiles';

// Service class for user profile operations
class UserProfileService {
  
  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Object} User profile data
   */
  static getProfileById(userId) {
    // In a real app, this would be an API call
    return MOCK_USER_PROFILES[userId] || null;
  }
  
  /**
   * Get current user's profile
   * @returns {Object} Current user profile
   */
  static getCurrentUserProfile() {
    // In a real app, this would use authentication
    return MOCK_USER_PROFILES['currentUser'];
  }
  
  /**
   * Check if current user is subscribed to another user
   * @param {string} targetUserId - ID of the user to check subscription for
   * @returns {boolean} True if subscribed, false otherwise
   */
  static isSubscribedTo(targetUserId) {
    const currentUser = this.getCurrentUserProfile();
    return currentUser?.subscriptions?.includes(targetUserId) || false;
  }
  
  /**
   * Toggle subscription status
   * @param {string} targetUserId - User ID to subscribe/unsubscribe
   * @returns {Object} Updated subscription data
   */
  static toggleSubscription(targetUserId) {
    // In a real app, this would be an API call with proper authentication
    
    // Get current user
    const currentUser = this.getCurrentUserProfile();
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    // Check if already subscribed
    const isAlreadySubscribed = this.isSubscribedTo(targetUserId);
    
    // Get target user
    const targetUser = this.getProfileById(targetUserId);
    
    if (!targetUser) {
      throw new Error('Target user not found');
    }
    
    // Create clones of the objects to simulate database update
    const updatedCurrentUser = { ...currentUser };
    const updatedTargetUser = { ...targetUser };
    
    if (isAlreadySubscribed) {
      // Unsubscribe
      updatedCurrentUser.subscriptions = updatedCurrentUser.subscriptions.filter(id => id !== targetUserId);
      updatedTargetUser.followers -= 1;
    } else {
      // Subscribe
      if (!updatedCurrentUser.subscriptions) {
        updatedCurrentUser.subscriptions = [];
      }
      updatedCurrentUser.subscriptions.push(targetUserId);
      updatedTargetUser.followers += 1;
    }
    
    // In a real app, these changes would be saved to a database
    // Here we're just simulating the response
    return {
      isSubscribed: !isAlreadySubscribed,
      followerCount: updatedTargetUser.followers,
      success: true
    };
  }
  
  /**
   * Get user's followers
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Starting offset for pagination
   * @returns {Array} List of followers
   */
  static getFollowers(userId, limit = 10, offset = 0) {
    // In a real app, this would be an API call
    // Here we're just simulating followers with random users from our mock data
    
    // Get all users except the current one
    const allUsers = Object.values(MOCK_USER_PROFILES)
      .filter(user => user.id !== userId);
    
    // Take a subset based on limit and offset
    return allUsers
      .slice(offset, offset + limit)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        title: user.title,
        isSubscribed: this.isSubscribedTo(user.id)
      }));
  }
  
  /**
   * Get users that a user is following
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Starting offset for pagination
   * @returns {Array} List of users being followed
   */
  static getFollowing(userId, limit = 10, offset = 0) {
    // In a real app, this would be an API call
    // Here we're just simulating following with random users from our mock data
    
    const user = this.getProfileById(userId);
    
    if (!user) {
      return [];
    }
    
    // If it's the current user, we can use their actual subscriptions
    if (userId === 'currentUser' && user.subscriptions) {
      const followingUsers = user.subscriptions
        .map(id => this.getProfileById(id))
        .filter(Boolean);
      
      return followingUsers
        .slice(offset, offset + limit)
        .map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          title: user.title,
          isSubscribed: true // Already subscribed to these users
        }));
    }
    
    // For other users, simulate with random users
    const allUsers = Object.values(MOCK_USER_PROFILES)
      .filter(u => u.id !== userId);
    
    return allUsers
      .slice(offset, offset + limit)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        title: user.title,
        isSubscribed: this.isSubscribedTo(user.id)
      }));
  }
  
  /**
   * Get user's posts
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Starting offset for pagination
   * @returns {Array} List of posts
   */
  static getUserPosts(userId, limit = 10, offset = 0) {
    const user = this.getProfileById(userId);
    
    if (!user || !user.posts) {
      return [];
    }
    
    return user.posts.slice(offset, offset + limit);
  }
}

export default UserProfileService;