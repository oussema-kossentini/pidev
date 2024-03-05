import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PublicationService } from '../publication.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Comment } from '../../comments/Comment';
import { CommentService } from '../../comments/CommentService';
import { AddPublicationComponent } from '../add-publication/add-publication.component';
@Component({
  selector: 'app-list-publication',
  templateUrl: './list-publication.component.html',
  styleUrls: ['./list-publication.component.scss']
})
export class ListPublicationComponent {
  PublicationList: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  @ViewChild('bottomOfPage') bottomOfPage!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('sidebarBtn') sidebarBtn!: ElementRef;
  isSidebarActive: boolean = false;
  menuItems: any[] = []; // Variable pour stocker les éléments de menu
  Comment: any[] = [];
Publications: any[]=[];
  publication: any;
  likes: number = 0; // Variable pour stocker le nombre de likes

  constructor(public publicationService: PublicationService,public dialog: MatDialog ,    private router: Router, private commentService: CommentService ) {
    
  }

  ngOnInit(): void {
    this.loadPublications(); // Appel de la méthode pour charger les publications lors de l'initialisation du composant

    this.menuItems = [
      {
        label: 'Utilisateur',
        icon: 'pi pi-user',
        items: [
          { label: 'Profil', icon: 'pi pi-fw pi-user-edit' },
          { label: 'Messages', icon: 'pi pi-fw pi-comments' },
          { label: 'Notifications', icon: 'pi pi-fw pi-bell' }
        ]
      }
    ];
  }
  openAddPublicationDialog(): void {
    const dialogRef = this.dialog.open(AddPublicationComponent, {
     width: '50%', // Ajustez la largeur selon vos besoins

    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traitez les données ou effectuez d'autres actions après la fermeture de la boîte de dialogue
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Hauteur de la fenêtre du navigateur
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
  
    // Hauteur totale de la page
    const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  
    // Position actuelle de la fenêtre par rapport au haut de la page
    const windowBottom = windowHeight + window.pageYOffset;
  
    // Si l'utilisateur a atteint le bas de la page et qu'aucun chargement n'est en cours
    if (windowBottom >= docHeight && !this.isLoading) {
      this.loadMorePublications(); // Charger plus de publications
    }
  }
  
  
  allPublicationsLoaded: boolean = false;

  toggleComments(publication: any): void {
    publication.showComments = !publication.showComments;
  }
  

  loadPublications(): void {
    this.isLoading = true;
this.publicationService.getPublications().subscribe(
  (data: any[]) => {
    this.PublicationList = data.map(publication => {
      const creationDate = new Date(publication.creationDate);
      return {
        ...publication,
        formattedCreationDate: creationDate.toLocaleString(),
        showComments: false, // Ajouter une propriété pour contrôler l'affichage des commentaires
        comments: [] // Initialiser la liste des commentaires vide
      };
    });

    // Charger les commentaires pour chaque publication
    this.PublicationList.forEach(publication => {
      this.loadCommentsForPublication(publication.idPublication);
    });

    this.isLoading = false;
  },
  error => {
    console.error('Error loading publications:', error);
    this.isLoading = false;
  }
);
  }


  loadCommentsForPublication(publicationId: string): void {
    this.commentService.getCommentsForPublication(publicationId).subscribe(
      (comments: any[]) => {
        // Trouver la publication correspondante dans PublicationList
        const publication = this.PublicationList.find(pub => pub.idPublication === publicationId);
        if (publication) {
          // Mettre à jour la liste des commentaires de la publication
          publication.comments = comments;
        }
      },
      error => {
        console.error(`Error loading comments for publication ${publicationId}:`, error);
      }
    );
  }
  

  showComments(publication: any): void {
    if (!publication.comments || publication.comments.length === 0) {
      // Charger les commentaires de la publication uniquement si la liste des commentaires est vide
      this.loadCommentsForPublication(publication.idPublication);
    }
    publication.showComments = !publication.showComments;}
  
  loadMorePublications(): void {
    this.isLoading = true;
    this.currentPage++;
    this.publicationService.getPublications().subscribe(
      (data: any[]) => {
        const newPublications = data.map(publication => {
          const creationDate = new Date(publication.creationDate);
          return {
            ...publication,
            formattedCreationDate: creationDate.toLocaleString()
          };
        });
        if (newPublications.length === 0) {
          this.allPublicationsLoaded = true;
        }
        this.PublicationList = [...this.PublicationList, ...newPublications];
        this.isLoading = false;
      },
      error => {
        console.error('Error loading more publications:', error);
        this.isLoading = false;
      }
    );
  }
  
   // Méthode pour supprimer un commentaire
   deleteComment(commentId: string) {
    this.commentService.removeComment(commentId).subscribe(
      () => {
        console.log('Comment deleted successfully');
        // Mettre à jour la liste des commentaires ou effectuer d'autres actions si nécessaire
      },
      error => {
        console.error('Error deleting comment:', error);
        // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
  }
  removeComments(i:number) {
    this.Comment.splice(i, 1);
 
  }

  editPublication(Publications: any): void {
    Publications.editing = true; // Activate edit mode for the user
  }

  saveChange(publication: any): void {
    publication.editing = false; // Deactivate edit mode for the user
    this.publicationService.modifyPublication(publication).subscribe({
      next: (response) => {
        console.log('User modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
      },
      error: (error) => {
        console.error('Error modifying user:', error);
        // Handle error, e.g., display error message to user
      }
    });
  }
 
  animateBox(event: any) {
    // Animer la box lors du survol en augmentant sa taille et en changeant sa couleur de fond
    event.target.style.transform = 'scale(1.1)'; // Augmenter la taille de la box
    event.target.style.backgroundColor = '#f0f0f0'; // Changer la couleur de fond de la box
  }

  resetBox(event: any) {
    // Réinitialiser la box après le survol en remettant sa taille et sa couleur de fond par défaut
    event.target.style.transform = 'scale(1)'; // Remettre la taille de la box par défaut
    event.target.style.backgroundColor = '#ffffff'; // Remettre la couleur de fond par défaut de la box
  }

  addCommentToPublication(idPublication: string, content: string) {
    const newComment: Comment = {
      content: content,
      creationDate: new Date(), // Utilisation de 'new Date()' pour obtenir la date actuelle
    };
    this.commentService.addCommentToPublication(idPublication, newComment)
      .subscribe(
        () => {
          // Le commentaire a été ajouté avec succès, implémentez ici la logique en cas de succès
          console.log('Comment added successfully');
        },
        error => {
          // Gérer les erreurs ici
          console.error('Failed to add comment:', error);
        }
      );
  }
  showCommentInput(publication: any): void {
    publication.showCommentInput = true; // Afficher la zone de commentaire pour cette publication
  }
  
  addComment(publication: any): void {
    if (publication.idPublication) { // Vérifiez que l'ID de la publication est défini
      const content = publication.newComment.trim();
      if (content !== '') {
        this.addCommentToPublication(publication.idPublication, content);
        publication.newComment = ''; // Réinitialiser le champ d'entrée après l'ajout du commentaire
        publication.showCommentInput = false; // Masquer la zone de commentaire après l'ajout du commentaire
      }
    } else {
      console.error('Publication ID is undefined');
      // Gérez le cas où l'ID de la publication est manquant
      // Affichez un message d'erreur ou prenez d'autres mesures nécessaires
    }
  }
  editComment(Comment: any): void {
    Comment.editing = true; // Activer le mode d'édition du commentaire
  }
  
  saveChanges(comment: any): void {
    comment.editing = false; // Deactivate edit mode for the user
    this.commentService.modifyComment(comment).subscribe({
      next: (response) => {
        console.log('User modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
      },
      error: (error) => {
        console.error('Error modifying user:', error);
        // Handle error, e.g., display error message to user
      }
    });
  }
  increaseLikes(): void {
    this.likes++; // Incrémente le nombre de likes à chaque clic
  }
  publications: { id: number, likes: number }[] = [];

}