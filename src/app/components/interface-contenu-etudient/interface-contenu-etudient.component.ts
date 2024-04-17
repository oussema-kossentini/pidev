import { Component } from '@angular/core';
import {CourseService} from "../../service/cours-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-interface-contenu-etudient',
  templateUrl: './interface-contenu-etudient.component.html',
  styleUrl: './interface-contenu-etudient.component.scss'
})
export class InterfaceContenuEtudientComponent {
  contents: any[] = [];
  filteredContents: any[] = [];
  searchTerm: string = '';

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getContenu();
  }

  getContenu(): void {
    this.courseService.getAllContent()
      .subscribe(
        (data: any[]) => {
          this.contents = data;
          this.filteredContents = [...this.contents]; // Initialize filteredContents with all contents initially
        },
        (error) => {
          console.log(error);
        }
      );
  }

  redirectToAddRoute() {
    // Redirect to '/addContenu'
    this.router.navigate(['/addContenu']);
  }

  deleteContent(contentId: any): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.courseService.deleteContenu(contentId)
        .subscribe(
          () => {
            // Filter out the deleted content from the contents array
            this.contents = this.contents.filter(content => content.id !== contentId);
            this.filteredContents = [...this.contents]; // Update filteredContents after deletion
          },
          (error) => {
            console.error('Error deleting content:', error);
          }
        );
    }
  }

  redirectToUpdateForm(contentId: any): void {
    if (contentId) { // Check if contentId is defined
      // Navigate to the modification form for the selected content
      this.router.navigate(['/contentUpdate', contentId]);
    } else {
      console.error('Content ID is undefined.');
    }
  }

  // Method to filter contents based on the search term
  filterContents(): void {
    this.filteredContents = this.contents.filter(content =>
      content.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
