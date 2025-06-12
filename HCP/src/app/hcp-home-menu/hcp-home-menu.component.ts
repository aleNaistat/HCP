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
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-wsbuilder.png'
      },
      {   
        title: 'FTP Account Manager',
        routing: '/ftp-manager',
        desc: 'Manage your FTP accounts',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-ftpacntmgr.gif'
      },
      {   
        title: 'Open Source Applications',
        desc: 'Add blogs, wikis, forums or other applications.',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-opensource.gif'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      
  ]},
  { 
    title: 'Security', 
    tools: [
      {
        title: 'Website Builder Tool',
        desc:'quickly and easily create a customized Website',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-wsbuilder.png'
      },
      {   
        title: 'FTP Account Manager',
        desc: 'Manage your FTP accounts',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-ftpacntmgr.gif'
      },
      {   
        title: 'Open Source Applications',
        desc: 'Add blogs, wikis, forums or other applications.',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-opensource.gif'
      },
      {   
        title: 'Cloud Backup',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-codeguard.png'
      },
      {   
        title: 'Custom Error Pages',
        routing: '/custom-error-pages',
        desc: 'Create and restore back ups with CodeGuard',
        icon: 'https://hcp.networksolutions.com/resources/inquent/images/english/serviceOverview/tb-icon-customerror.gif'
      },
  ]}
]
}
