import { Injectable } from '@angular/core';

/**
 * @description
 * User roles within the application.
 */
export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  USER = 'USER',
}

/**
 * @description
 * Represents a role, including its name and access level.
 * @property {Roles} name - The name of the role.
 * @property {number} accessLevel - The access level associated with the role.
 */
export type Role = {
  name: Roles;
  accessLevel: number;
};

/**
 * @description
 * Represents a user, including their name and role.
 * @property {string} name - The name of the user.
 * @property {Roles} role - The role assigned to the user.
 */
export type User = {
  name: string;
  role: Roles;
};

@Injectable({
  providedIn: 'root',
})
export class RbacService {
  /**
   * @description An array of predefined roles with their respective access levels.
   * @private
   */
  private _roles: Role[] = [
    { name: Roles.ADMINISTRATOR, accessLevel: 1 },
    { name: Roles.USER, accessLevel: 2 },
  ];

  /**
   * @description The currently authenticated user.
   * @private
   */
  private _authenticatedUser!: User;

  /**
   * @description Checks if a user is currently authenticated.
   * @returns {boolean} - True if a user is authenticated, false otherwise.
   */
  get isUserAuthenticated(): boolean {
    return !!this._authenticatedUser;
  }

  /**
   * @description Sets the authenticated user.
   * @param {User} user - The user to be authenticated.
   */
  setAuthenticatedUser(user: User): void {
    this._authenticatedUser = user;
  }

  /**
   * @description Checks if the authenticated user has the required role.
   * @param {string} role - The role to be checked.
   * @returns {boolean} - True if the authenticated user has the required role, false otherwise.
   */
  isGranted(role: string): boolean {
    if (!this._authenticatedUser) return false;

    const requestedRole = this._roles.find((r) => r.name === role);
    const authenticatedUserRole = this._roles.find(
      (r) => r.name === this._authenticatedUser.role
    );

    if (
      requestedRole &&
      authenticatedUserRole &&
      authenticatedUserRole.accessLevel <= requestedRole.accessLevel
    ) {
      return true;
    } else {
      console.log('stop');
      return false;
    }
  }
}
