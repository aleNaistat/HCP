import { Component } from '@angular/core';
import { HomeDrawerComponent } from '../home-drawer/home-drawer.component';

@Component({
  selector: 'app-hcp-home-menu',
  imports: [HomeDrawerComponent],
  templateUrl: './hcp-home-menu.component.html',
  styleUrl: './hcp-home-menu.component.scss'
})
export class HcpHomeMenuComponent {
  title = 'HCP';

  sections = [
    { 
    title: 'Most Popular Tools', 
    tools: [
      {
        title: 'Website Builder Tool',
        desc:'Quickly and easily create a customized Website',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'FTP Account Manager',
        routing: '/ftp-manager',
        desc: 'Manage your FTP accounts',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Open Source Applications',
        desc: 'Add blogs, wikis, forums or other applications.',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      
  ]},
  { 
    title: 'Security', 
    tools: [
      {
        title: 'Website Builder Tool',
        desc:'quickly and easily create a customized Website',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'FTP Account Manager',
        desc: 'Manage your FTP accounts',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Open Source Applications',
        desc: 'Add blogs, wikis, forums or other applications.',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/Working_Tools_2-128.png'
      },
  ]}
]
}
