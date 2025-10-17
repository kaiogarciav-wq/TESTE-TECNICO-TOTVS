import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map(p => ({
          ...p,
          sku: p.sku || `SKU-${p.id}`,
          unit: p.unit || 'UN',
          // Simulação de dados adicionais para estoque, localização e vencimento
          // Lembre-se: Em um cenário real, esses dados viriam diretamente do backend
          totalStock: p.totalStock !== undefined ? p.totalStock : (Math.floor(Math.random() * 100) + 1), // 1 a 100
          activeLocations: p.activeLocations !== undefined ? p.activeLocations : Math.floor(Math.random() * 5), // 0 a 4 locais
          //nextDueDate: p.nextDueDate !== undefined ? p.nextDueDate : this.generateRandomDueDate(),
          nextDueDate: p.nextDueDate,
          // Novos campos para simular limites de estoque
          minStockLevel: p.minStockLevel !== undefined ? p.minStockLevel : Math.floor(Math.random() * 10) + 5, // 5 a 14
          maxStockLevel: p.maxStockLevel !== undefined ? p.maxStockLevel : Math.floor(Math.random() * 50) + 50, // 50 a 99
          // A imagem agora usa o ID para gerar URLs mais únicas na simulação
          imageUrl: p.imageUrl || `https://picsum.photos/id/${(p.id ?? 10) + Math.floor(Math.random() * 50)}/32/32`
        })).sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        // Ajustar reservedStock e availableStock para serem consistentes com totalStock
        this.products = this.products.map(p => {
            const total = p.totalStock ?? 0;
            // Garante que reservedStock não exceda totalStock e seja um valor válido
            const reserved = p.reservedStock !== undefined && p.reservedStock <= total
                             ? p.reservedStock
                             : Math.floor(Math.random() * (total > 0 ? total : 1)); // Gera um reservado aleatório <= total

            const available = total - reserved; // Disponível é o total menos o reservado
            return {
                ...p,
                availableStock: available >= 0 ? available : 0, // Garante que disponível não seja negativo
                reservedStock: reserved
            };
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.error = 'Falha ao carregar produtos. Por favor, verifique sua conexão ou tente novamente.';
        this.loading = false;
      }
    });
  }

  editProduct(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/products/edit', id]);
    } else {
      this.notificationService.error('ID do produto não especificado para edição.');
    }
  }

  deleteProduct(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notificationService.success('Produto excluído com sucesso!');
          this.loadProducts(); // Recarrega a lista após a exclusão
        },
        error: (err) => {
          console.error('Error deleting product', err);
          this.notificationService.error('Erro ao excluir produto.');
        }
      });
    } else if (!id) {
      this.notificationService.error('ID do produto não especificado para exclusão.');
    }
  }

  createNewProduct(): void {
    this.router.navigate(['/products/new']);
  }

  viewDetailedStock(id: number | undefined): void {
    if (id) {
      this.notificationService.info(`Navegando para o estoque detalhado do produto ${id}. (Funcionalidade a ser implementada)`);
      // Exemplo de rota, descomente e configure no seu routing module:
      // this.router.navigate(['/products', id, 'stock-detail']);
    } else {
      this.notificationService.error('ID do produto não especificado para ver detalhes do estoque.');
    }
  }

  // --- Funções para os Indicadores Visuais ---

  getStockStatusClass(totalStock: number | undefined, minLevel: number | undefined, maxLevel: number | undefined): string {
    if (totalStock === undefined || totalStock === null) return 'stock-unknown';
    minLevel = minLevel ?? 0;
    maxLevel = maxLevel ?? 1000;

    if (totalStock <= 0) return 'stock-critical';
    if (totalStock < minLevel) return 'stock-low';
    if (totalStock > maxLevel) return 'stock-high';
    return 'stock-normal';
  }

  getStockIcon(totalStock: number | undefined, minLevel: number | undefined, maxLevel: number | undefined): string {
    const statusClass = this.getStockStatusClass(totalStock, minLevel, maxLevel);
    switch (statusClass) {
      case 'stock-critical': return 'fas fa-exclamation-circle'; // Ícone para estoque crítico/esgotado
      case 'stock-low': return 'fas fa-exclamation-triangle'; // Ícone para estoque baixo
      case 'stock-high': return 'fas fa-box-open'; // Ícone para estoque muito alto
      case 'stock-normal': return 'fas fa-check-circle'; // Ícone para estoque normal
      default: return 'fas fa-question-circle'; // Ícone para estoque desconhecido
    }
  }

  getStockTooltip(product: Product): string {
    return `Total: ${product.totalStock ?? 'N/A'}\nDisponível: ${product.availableStock ?? 'N/A'}\nReservado: ${product.reservedStock ?? 'N/A'}\nMínimo: ${product.minStockLevel ?? 'N/A'}\nMáximo: ${product.maxStockLevel ?? 'N/A'}`;
  }

  getLocationTooltip(product: Product): string {
    if (product.activeLocations === 0) return 'Nenhuma localização ativa.';
    if (product.activeLocations === 1) return 'Em 1 localização.';
    return `Em ${product.activeLocations} localizações.`;
  }

  getDueDateClass(dueDateString: string | null | undefined): string {
    if (!dueDateString) return 'due-date-none';
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const alertThreshold = new Date();
    alertThreshold.setDate(today.getDate() + 30); // 30 dias para alerta
    const criticalThreshold = new Date();
    criticalThreshold.setDate(today.getDate() + 7); // 7 dias para crítico

    if (dueDate < today) return 'due-date-expired';
    if (dueDate <= criticalThreshold) return 'due-date-critical';
    if (dueDate <= alertThreshold) return 'due-date-soon';
    return 'due-date-normal';
  }

  getDueDateIcon(dueDateString: string | null | undefined): string {
    const statusClass = this.getDueDateClass(dueDateString);
    switch (statusClass) {
      case 'due-date-expired': return 'fas fa-calendar-times'; // Ícone para vencido
      case 'due-date-critical': return 'fas fa-exclamation-triangle'; // Ícone para crítico
      case 'due-date-soon': return 'fas fa-hourglass-half'; // Ícone para em breve
      case 'due-date-normal': return 'fas fa-calendar-check'; // Ícone para normal
      default: return 'fas fa-question-circle';
    }
  }

  private generateRandomDueDate(): string | null {
    const shouldHaveDueDate = Math.random() > 0.3;
    if (!shouldHaveDueDate) {
      return null;
    }

    const today = new Date();
    const rand = Math.random();
    let daysToAdd: number;

    if (rand < 0.20) { // Crítico: hoje a +7 dias
      daysToAdd = Math.floor(Math.random() * 8);
    } else if (rand < 0.50) { // Em breve: +8 a +30 dias
      daysToAdd = Math.floor(Math.random() * 23) + 8;
    } else if (rand < 0.90) { // Normal: +31 a +180 dias
      daysToAdd = Math.floor(Math.random() * 150) + 31;
    } else { // Vencido: -30 a -1 dias
      daysToAdd = Math.floor(Math.random() * 30) - 30;
    }

    const randomDate = new Date();
    randomDate.setDate(today.getDate() + daysToAdd);

    return randomDate.toISOString();
  }
}