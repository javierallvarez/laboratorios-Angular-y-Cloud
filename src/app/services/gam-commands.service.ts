import { Injectable } from '@angular/core';
import { GamCommand } from '../models/gam-command.model';
import { BehaviorSubject, Observable } from 'rxjs';

// Datos dummy para mostrar la salida de los comandos de GAM, generados por IA con personajes de Los Simpsons
@Injectable({
  providedIn: 'root'
})
export class GamCommandsService {
  private STORAGE_KEY = 'gam_commands_data';
  
  private commandsSubject = new BehaviorSubject<GamCommand[]>([]);
  public commands$ = this.commandsSubject.asObservable();

  private defaultCommands: GamCommand[] = [
    {
      id: 1,
      title: 'View user information',
      command: 'gam info user homer.simpson@springfield.com',
      description: 'Shows detailed information about a specific user including their status, last login, and account configuration.',
      category: 'Users',
      tags: ['user', 'info', 'details'],
      example: {
        headers: ['Property', 'Value'],
        output: `User: homer.simpson@springfield.com
  Settings:
    First Name: Homer
    Last Name: Simpson
    Full Name: Homer J. Simpson
    Languages: en-US
    Is a Super Admin: False
    Is Delegated Admin: False
    2-step enrolled: False
    2-step enforced: False
    Has Agreed to Terms: True
    Account Suspended: False
    Must Change Password: False
    Google Unique ID: 102657176865442021380
    Customer ID: C02springfield
    Creation Time: 1989-12-17T07:35:41Z
    Last login time: 2025-12-16T14:59:40Z
    Google Org Unit Path: /Employees/NuclearSafety/Sector7G
    Recovery Email: chunkylover53@aol.com
    Photo URL: https://lh3.google.com/u/0/photos/homer-profile
  Addresses:
    type: home
      primary: True
      streetAddress: 742 Evergreen Terrace
      locality: Springfield
      postalCode: 49007
      country: USA
  Organizations:
    type: work
      name: Springfield Nuclear Power Plant
      location: 100 Industrial Way
      department: Safety Inspector
      title: Safety Inspector
      primary: True
  Relations:
    type: manager
      value: c.montgomery.burns@springfield.com
    type: spouse
      value: marge.simpson@springfield.com
  Other Emails:
    type: alias
      address: max.power@springfield.com
    type: alias
      address: mr.plow@springfield.com
  Groups: (3)
    Power Plant Employees: plant-employees@springfield.com
    Stonecutters: stonecutters@springfield.com
    Bowling Team: pin-pals@springfield.com
  Licenses: (1)
    1010020020 (Google Workspace Enterprise Plus)`
      }
    },
    {
      id: 2,
      title: 'List all users',
      command: 'gam print users',
      description: 'Generates a CSV report with all domain users, including basic information such as email, name, and status.',
      category: 'Users',
      tags: ['users', 'list', 'report'],
      example: {
        headers: ['Email', 'First Name', 'Last Name', 'Status', 'Created'],
        output: `homer.simpson@springfield.com,Homer,Simpson,Active,1989-12-17
marge.simpson@springfield.com,Marge,Simpson,Active,1989-12-17
bart.simpson@springfield.com,Bart,Simpson,Active,1990-10-11
lisa.simpson@springfield.com,Lisa,Simpson,Active,1992-05-01
ned.flanders@springfield.com,Ned,Flanders,Active,1990-02-15
moe.szyslak@springfield.com,Moe,Szyslak,Active,1991-08-23
barney.gumble@springfield.com,Barney,Gumble,Suspended,1993-01-10`
      }
    },
    {
      id: 3,
      title: 'Show user groups',
      command: 'gam user lisa.simpson@springfield.com show groups',
      description: 'Lists all Google Workspace groups that a specific user belongs to.',
      category: 'Groups',
      tags: ['groups', 'user', 'membership'],
      example: {
        headers: ['Group', 'Email', 'Role'],
        output: `mensa@springfield.com - Member
jazz-band@springfield.com - Member
student-council@springfield.com - President
vegetarians@springfield.com - Owner`
      }
    },
    {
      id: 4,
      title: 'Create new user',
      command: 'gam create user frank.grimes@springfield.com firstname "Frank" lastname "Grimes" password "HighVoltage!"',
      description: 'Creates a new user account in Google Workspace with first name, last name, and initial password.',
      category: 'Users',
      tags: ['create', 'user', 'new'],
      example: {
        headers: ['Result', 'Details'],
        output: `User created successfully
Email: frank.grimes@springfield.com
Name: Frank Grimes
Password: HighVoltage!
Status: Active
Must change password: Yes
User ID: 108234567890123456789`
      }
    },
    {
      id: 5,
      title: 'Update user information',
      command: 'gam update user waylon.smithers@springfield.com manager "c.montgomery.burns@springfield.com"',
      description: 'Modifies data of an existing user such as phone, department, location, or manager.',
      category: 'Users',
      tags: ['update', 'user', 'modify'],
      example: {
        headers: ['Field', 'Previous Value', 'New Value'],
        output: `Updating user: waylon.smithers@springfield.com
Manager: "" → "c.montgomery.burns@springfield.com"
Update completed successfully`
      }
    },
    {
      id: 6,
      title: 'List all groups',
      command: 'gam print groups',
      description: 'Generates a CSV listing of all domain groups with their basic information and member count.',
      category: 'Groups',
      tags: ['groups', 'list', 'report'],
      example: {
        headers: ['Email', 'Name', 'Description', 'Members', 'Type'],
        output: `plant-employees@springfield.com,Power Plant Staff,All nuclear plant employees,145,INTERNAL
elementary-school@springfield.com,School Staff,Teachers and staff,42,INTERNAL
stonecutters@springfield.com,The Stonecutters,Secret society,50,Restricted
police-force@springfield.com,Springfield Police,Law enforcement,15,INTERNAL`
      }
    },
    {
      id: 7,
      title: 'List organizational units',
      command: 'gam print orgs',
      description: 'Shows the structure of organizational units (OUs) in the domain and how many users are in each.',
      category: 'Organization',
      tags: ['ou', 'organization', 'structure'],
      example: {
        headers: ['Path', 'Name', 'Description', 'Users'],
        output: `/,Springfield,Root unit,5
/Employees,Employees,All inhabitants,500
/Employees/NuclearSafety,Nuclear Safety,Sector 7G,3
/Employees/School,Elementary School,Students and Teachers,200
/Employees/CityHall,City Hall,Government employees,25
/Contractors,Contractors,Monorail Conductors,2`
      }
    },
    {
      id: 8,
      title: 'Get user aliases',
      command: 'gam user krusty.clown@springfield.com show aliases',
      description: 'Lists all email aliases associated with a user account.',
      category: 'Users',
      tags: ['alias', 'user', 'email'],
      example: {
        headers: ['Primary Email', 'Aliases'],
        output: `Primary Email: krusty.clown@springfield.com

Aliases:
  herschel.krustofsky@springfield.com
  rory.b.bellows@springfield.com
  clown@springfield.com
  
Total aliases: 3`
      }
    },
    {
      id: 9,
      title: 'Update user profile data',
      command: 'gam update user ned.flanders@springfield.com title "Owner" department "Leftorium"',
      description: 'Updates specific user fields such as full name, work phone, or other profile data.',
      category: 'Users',
      tags: ['update', 'modify', 'profile', 'data'],
      example: {
        headers: ['User', 'Field', 'New Value'],
        output: `Updating user: ned.flanders@springfield.com
Title: "Neighbor" → "Owner"
Department: "" → "Leftorium"
Last modified: 2024-11-17 10:45:33
Update completed successfully`
      }
    },
    {
      id: 10,
      title: 'Suspend user',
      command: 'gam update user sideshow.bob@springfield.com suspended on',
      description: 'Temporarily suspends a user account without deleting their data. User cannot access until the account is reactivated.',
      category: 'Users',
      tags: ['suspend', 'deactivate', 'block', 'user'],
      example: {
        headers: ['User', 'Status', 'Action'],
        output: `Suspending user: sideshow.bob@springfield.com
Previous status: Active
New status: Suspended
Suspended by: clancy.wiggum@springfield.com
Reason: Attempted murder
User cannot access until account is reactivated`
      }
    },
    {
      id: 11,
      title: 'Reactivate user',
      command: 'gam update user abraham.simpson@springfield.com suspended off',
      description: 'Reactivates a previously suspended user account, allowing the user to access again.',
      category: 'Users',
      tags: ['reactivate', 'activate', 'restore', 'user'],
      example: {
        headers: ['User', 'Status', 'Result'],
        output: `Reactivating user: abraham.simpson@springfield.com
Previous status: Suspended
New status: Active
Reason: Mistakenly thought deceased
User can now access their account again`
      }
    },
    {
      id: 12,
      title: 'Change user password',
      command: 'gam update user monty.burns@springfield.com password Excellent123! changepassword',
      description: 'Sets a new password for a user and forces them to change it at next login for security.',
      category: 'Users',
      tags: ['password', 'security', 'change'],
      example: {
        headers: ['User', 'Action', 'Status'],
        output: `Updating password: monty.burns@springfield.com
New password: ************
Must change password: Yes
Updated by: waylon.smithers@springfield.com
Password updated successfully
User must set a new password at next login`
      }
    },
    {
      id: 13,
      title: 'Delete user',
      command: 'gam delete user frank.grimes@springfield.com',
      description: 'Deletes a user account by moving it to trash. Data can be recovered for 20 days before permanent deletion.',
      category: 'Users',
      tags: ['delete', 'remove', 'trash'],
      example: {
        headers: ['User', 'Action', 'Status'],
        output: `Deleting user: frank.grimes@springfield.com
Previous status: Active
New status: Deleted
Deleted by: homer.simpson@springfield.com
Account moved to trash
Data will be retained for 20 days`
      }
    },
    {
      id: 14,
      title: 'Restore deleted user',
      command: 'gam undelete user hans.moleman@springfield.com',
      description: 'Restores a recently deleted user account (within the last 20 days) from trash.',
      category: 'Users',
      tags: ['restore', 'recover', 'undelete', 'trash'],
      example: {
        headers: ['User', 'Action', 'Result'],
        output: `Restoring user: hans.moleman@springfield.com
Previous status: Deleted
New status: Active
Restored by: homer.simpson@springfield.com
Days in trash: 19
User restored successfully
"I was saying Boo-urns"`
      }
    },
    {
      id: 16,
      title: 'User login activity',
      command: 'gam user bart.simpson@springfield.com print loginactivity',
      description: 'Lists user login history with details of IP, device, and location.',
      category: 'Users',
      tags: ['login', 'activity', 'security', 'access'],
      example: {
        headers: ['Date', 'IP', 'Device', 'Status', 'Location'],
        output: `User: bart.simpson@springfield.com
Recent logins:

2024-11-17 09:15:23 | 192.168.1.105 | iPhone 15 | Success | Springfield Elementary
2024-11-17 08:30:12 | 192.168.1.105 | iPhone 15 | Success | The Treehouse
2024-11-16 18:45:30 | 10.0.0.25 | Linux | Failed | Milhouse's House`
      }
    },
    {
      id: 17,
      title: 'Connected applications',
      command: 'gam user marge.simpson@springfield.com print tokens',
      description: 'Shows all third-party applications and services that have authorized access to the user account.',
      category: 'Users',
      tags: ['tokens', 'applications', 'permissions', 'oauth', 'security'],
      example: {
        headers: ['Application', 'Scope', 'Authorization Date'],
        output: `User: marge.simpson@springfield.com
Authorized applications:

Pinterest
  Scope: Drive, Photos
  Authorized: 2024-09-15

Springfield Recipes App
  Scope: Gmail
  Authorized: 2024-10-20`
      }
    },
    {
      id: 18,
      title: 'User Gmail profile',
      command: 'gam user lisa.simpson@springfield.com print gmailprofile',
      description: 'Gets Gmail profile information including total messages, threads, labels, and storage usage.',
      category: 'Gmail',
      tags: ['gmail', 'profile', 'email', 'messages'],
      example: {
        headers: ['Metric', 'Value', 'Details'],
        output: `User: lisa.simpson@springfield.com
Email: lisa.simpson@springfield.com

Gmail Statistics:
Total messages: 45,231
Total threads: 12,100
Messages per month (average): 800
History ID: 99887766

Storage usage:
Gmail storage: 12.5 GB
Percentage used: 41.6%`
      }
    },
    {
      id: 19,
      title: 'Gmail IMAP configuration',
      command: 'gam user apu.nahasapeemapetilon@springfield.com show imap',
      description: 'Shows user IMAP access configuration for external email clients (Outlook, Thunderbird, etc.).',
      category: 'Gmail',
      tags: ['gmail', 'configuration', 'imap', 'settings'],
      example: {
        headers: ['Configuration', 'Status', 'Value'],
        output: `User: apu.nahasapeemapetilon@springfield.com

IMAP Configuration:
Status: Enabled
Auto-expunge: Activated
Expunge Behavior: archive
Max Folder Size: 0 (Unlimited)

Connected clients:
  - Kwik-E-Mart POS System`
      }
    },
    {
      id: 20,
      title: 'Count files in Google Drive',
      command: 'gam user prof.frink@springfield.com print filecounts',
      description: 'Generates a count of user files in Google Drive grouped by file type.',
      category: 'Drive',
      tags: ['drive', 'files', 'count', 'statistics'],
      example: {
        headers: ['File Type', 'Count', 'Total Size'],
        output: `User: prof.frink@springfield.com
Drive file count:

Scientific Data (Dat): 5,000 files | 100 GB
Blueprints (PDF): 450 files | 2.5 GB
Google Sheets: 1,200 files | 500 MB
Glavin-images (PNG): 300 files | 1.2 GB

Total files: 6,950
Total space used: 104.2 GB`
      }
    },
    {
      id: 21,
      title: 'Google Drive configuration',
      command: 'gam user nelson.muntz@springfield.com print drivesettings',
      description: 'Shows user Google Drive configuration including sharing permissions and sync options.',
      category: 'Drive',
      tags: ['drive', 'configuration', 'settings', 'permissions'],
      example: {
        headers: ['Configuration', 'Status', 'Value'],
        output: `User: nelson.muntz@springfield.com

Drive Configuration:
Storage used: 0.1 GB / 30 GB
Percentage used: 0.3%

Sharing permissions:
Share with external: Denied
Default shared link: Restricted

Trash:
Files in trash: 0
"Ha-ha!"`
      }
    }
  ];

  constructor() {
    this.loadCommands();
  }

  private loadCommands(): void {
    const storedCommands = localStorage.getItem(this.STORAGE_KEY);
    if (storedCommands) {
      try {
        const parsed = JSON.parse(storedCommands);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.commandsSubject.next(parsed);
          return;
        }
      } catch (e) {
        console.error('Error loading commands from localStorage', e);
      }
    }
    // Si no hay datos en localStorage o falló, cargamos los defaults
    this.commandsSubject.next(this.defaultCommands);
    this.saveToStorage(this.defaultCommands);
  }

  private saveToStorage(commands: GamCommand[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(commands));
  }

  getCommands(): GamCommand[] {
    return this.commandsSubject.value;
  }

  // Devuelve los comandos 
  getCommandsSync(): GamCommand[] {
    return this.commandsSubject.value;
  }

  getCategories(): string[] {
    return [...new Set(this.commandsSubject.value.map(cmd => cmd.category))];
  }

  addCommand(command: GamCommand): void {
    const currentCommands = this.commandsSubject.value;
    
    // Generar ID de forma automática si no tiene
    if (!command.id) {
      command.id = Math.max(...currentCommands.map(c => c.id), 0) + 1;
    }

    const updatedCommands = [...currentCommands, command];
    this.commandsSubject.next(updatedCommands);
    this.saveToStorage(updatedCommands);
  }
}
