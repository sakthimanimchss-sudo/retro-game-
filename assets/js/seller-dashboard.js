// ============================================
// assets/js/seller-dashboard.js
// Seller Dashboard JavaScript
// Complete with Chart Simulation, Data Management, and Interactive Features
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // DASHBOARD DATA (Simulated)
    // ========================================
    
    const dashboardData = {
        stats: {
            activeListings: 12,
            soldThisMonth: 24,
            monthlyRevenue: 1847,
            totalViews: 2345
        },
        recentOrders: [
            {
                id: 'ORD-12345',
                item: 'Super Mario World (SNES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459156.png',
                buyer: 'MarioFan',
                date: '2025-02-15',
                total: 79.99,
                status: 'paid'
            },
            {
                id: 'ORD-12346',
                item: 'The Legend of Zelda (NES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459115.png',
                buyer: 'ZeldaFan',
                date: '2025-02-14',
                total: 129.99,
                status: 'shipped'
            },
            {
                id: 'ORD-12347',
                item: 'Sonic the Hedgehog 2 (Genesis)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459122.png',
                buyer: 'SonicFan',
                date: '2025-02-12',
                total: 49.99,
                status: 'pending'
            }
        ],
        activeListings: [
            {
                id: 'LST-001',
                item: 'Mega Man 2 (NES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459130.png',
                price: 79.99,
                condition: 'mint',
                views: 234,
                watchers: 12,
                listedDate: '2025-02-10'
            },
            {
                id: 'LST-002',
                item: 'Donkey Kong Country (SNES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459091.png',
                price: 44.99,
                condition: 'good',
                views: 156,
                watchers: 8,
                listedDate: '2025-02-08'
            },
            {
                id: 'LST-003',
                item: 'Castlevania (NES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/686/686215.png',
                price: 44.99,
                condition: 'fair',
                views: 89,
                watchers: 3,
                listedDate: '2025-02-05'
            }
        ],
        topSelling: [
            {
                item: 'Super Mario World (SNES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459156.png',
                sold: 24,
                revenue: 1919.76,
                trend: 'up',
                trendPercentage: 12
            },
            {
                item: 'The Legend of Zelda (NES)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459115.png',
                sold: 18,
                revenue: 2339.82,
                trend: 'up',
                trendPercentage: 8
            },
            {
                item: 'Sonic the Hedgehog 2 (Genesis)',
                itemImage: 'https://cdn-icons-png.flaticon.com/512/2459/2459122.png',
                sold: 15,
                revenue: 749.85,
                trend: 'down',
                trendPercentage: 3
            }
        ],
        salesData: {
            week: [40, 65, 45, 80, 55, 70, 90],
            month: [450, 520, 480, 600, 750, 820, 690, 540, 580, 620, 710, 680],
            year: [1250, 1480, 1620, 1890, 2100, 2350, 2780, 2650, 2420, 2250, 1980, 2150]
        }
    };

    // ========================================
    // CHART RENDERING
    // ========================================

    class SalesChart {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.currentPeriod = 'week';
            this.bars = this.container.querySelectorAll('.bar');
            this.initChartControls();
            this.renderChart(this.currentPeriod);
        }

        initChartControls() {
            const controls = document.querySelectorAll('.chart-btn');
            controls.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const period = e.target.textContent.toLowerCase();
                    this.switchPeriod(period, e.target);
                });
            });
        }

        switchPeriod(period, activeBtn) {
            this.currentPeriod = period;
            
            // Update active button
            document.querySelectorAll('.chart-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
            
            // Render chart for new period
            this.renderChart(period);
        }

        renderChart(period) {
            const data = dashboardData.salesData[period];
            if (!data || !this.bars.length) return;

            const maxValue = Math.max(...data);
            
            this.bars.forEach((bar, index) => {
                if (index < data.length) {
                    const height = (data[index] / maxValue) * 150; // Max height 150px
                    bar.style.height = height + 'px';
                    
                    // Add tooltip
                    bar.setAttribute('title', `$${data[index]}`);
                    
                    // Animate
                    bar.style.animation = 'none';
                    bar.offsetHeight; // Trigger reflow
                    bar.style.animation = 'barGrow 0.5s ease-out';
                }
            });
        }
    }

    // ========================================
    // ORDER MANAGEMENT
    // ========================================

    class OrderManager {
        constructor() {
            this.initOrderActions();
        }

        initOrderActions() {
            // Process order buttons
            document.querySelectorAll('.btn-small').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = btn.textContent.trim();
                    const orderRow = btn.closest('tr');
                    
                    if (orderRow) {
                        this.handleOrderAction(action, orderRow);
                    }
                });
            });
        }

        handleOrderAction(action, orderRow) {
            const orderId = orderRow.querySelector('td:first-child').textContent;
            
            switch(action) {
                case 'Process':
                    this.processOrder(orderId, orderRow);
                    break;
                case 'Track':
                    this.trackOrder(orderId, orderRow);
                    break;
                case 'View':
                    this.viewOrder(orderId, orderRow);
                    break;
            }
        }

        processOrder(orderId, orderRow) {
            this.showNotification(`Processing order ${orderId}`, 'info');
            
            // Update status in UI
            const statusCell = orderRow.querySelector('.status');
            if (statusCell) {
                statusCell.className = 'status shipped';
                statusCell.textContent = 'Shipped';
            }
            
            // Change button
            const actionBtn = orderRow.querySelector('.btn-small');
            if (actionBtn) {
                actionBtn.textContent = 'Track';
            }
            
            this.showNotification(`Order ${orderId} marked as shipped`, 'success');
        }

        trackOrder(orderId, orderRow) {
            this.showNotification(`Tracking information for ${orderId}`, 'info');
            // Simulate tracking modal
            this.showModal('Tracking Information', `
                <div class="tracking-info">
                    <p><strong>Order:</strong> ${orderId}</p>
                    <p><strong>Carrier:</strong> USPS</p>
                    <p><strong>Tracking #:</strong> 9405 5012 3456 7890 1234 56</p>
                    <p><strong>Status:</strong> In Transit</p>
                    <p><strong>Estimated Delivery:</strong> March 3-5, 2025</p>
                </div>
            `);
        }

        viewOrder(orderId, orderRow) {
            this.showNotification(`Viewing details for ${orderId}`, 'info');
            
            // Get order details from data
            const order = dashboardData.recentOrders.find(o => o.id === orderId);
            if (order) {
                this.showModal('Order Details', `
                    <div class="order-details">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Item:</strong> ${order.item}</p>
                        <p><strong>Buyer:</strong> ${order.buyer}</p>
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                    </div>
                `);
            }
        }
    }

    // ========================================
    // LISTING MANAGEMENT
    // ========================================

    class ListingManager {
        constructor() {
            this.initListingActions();
        }

        initListingActions() {
            // Edit buttons
            document.querySelectorAll('.action-icon .fa-edit').forEach(icon => {
                icon.closest('.action-icon').addEventListener('click', (e) => {
                    e.preventDefault();
                    const listingRow = e.target.closest('tr');
                    this.editListing(listingRow);
                });
            });

            // Stats buttons
            document.querySelectorAll('.action-icon .fa-chart-line').forEach(icon => {
                icon.closest('.action-icon').addEventListener('click', (e) => {
                    e.preventDefault();
                    const listingRow = e.target.closest('tr');
                    this.viewListingStats(listingRow);
                });
            });

            // Copy buttons
            document.querySelectorAll('.action-icon .fa-copy').forEach(icon => {
                icon.closest('.action-icon').addEventListener('click', (e) => {
                    e.preventDefault();
                    const listingRow = e.target.closest('tr');
                    this.duplicateListing(listingRow);
                });
            });

            // Delete buttons
            document.querySelectorAll('.action-icon .fa-trash').forEach(icon => {
                icon.closest('.action-icon').addEventListener('click', (e) => {
                    e.preventDefault();
                    const listingRow = e.target.closest('tr');
                    this.deleteListing(listingRow);
                });
            });
        }

        editListing(listingRow) {
            const itemName = listingRow.querySelector('.listing-item span').textContent;
            this.showNotification(`Editing: ${itemName}`, 'info');
            
            // Simulate edit modal
            this.showModal('Edit Listing', `
                <form id="edit-listing-form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" value="${itemName}" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Price ($)</label>
                        <input type="number" value="79.99" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Condition</label>
                        <select class="form-input">
                            <option>Mint</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-input" rows="4">Original cartridge in great condition. Tested and working.</textarea>
                    </div>
                    <button type="submit" class="modal-btn">Save Changes</button>
                </form>
            `);
        }

        viewListingStats(listingRow) {
            const itemName = listingRow.querySelector('.listing-item span').textContent;
            const views = listingRow.querySelector('td:nth-child(4)').textContent;
            const watchers = listingRow.querySelector('td:nth-child(5)').textContent;
            
            this.showModal('Listing Statistics', `
                <div class="stats-details">
                    <p><strong>Item:</strong> ${itemName}</p>
                    <p><strong>Total Views:</strong> ${views}</p>
                    <p><strong>Current Watchers:</strong> ${watchers}</p>
                    <p><strong>Conversion Rate:</strong> 5.2%</p>
                    <p><strong>Average Time to Sale:</strong> 8 days</p>
                </div>
            `);
        }

        duplicateListing(listingRow) {
            const itemName = listingRow.querySelector('.listing-item span').textContent;
            
            this.showConfirmDialog(
                'Duplicate Listing',
                `Create a copy of "${itemName}"?`,
                () => {
                    this.showNotification(`Listing duplicated: ${itemName}`, 'success');
                    
                    // Simulate new row
                    const newRow = listingRow.cloneNode(true);
                    const tbody = listingRow.closest('tbody');
                    tbody.appendChild(newRow);
                    
                    // Update item name
                    const newItemSpan = newRow.querySelector('.listing-item span');
                    newItemSpan.textContent = `${itemName} (Copy)`;
                }
            );
        }

        deleteListing(listingRow) {
            const itemName = listingRow.querySelector('.listing-item span').textContent;
            
            this.showConfirmDialog(
                'Delete Listing',
                `Are you sure you want to delete "${itemName}"?`,
                () => {
                    listingRow.remove();
                    this.showNotification(`Listing deleted: ${itemName}`, 'success');
                }
            );
        }
    }

    // ========================================
    // QUICK ACTIONS
    // ========================================

    class QuickActions {
        constructor() {
            this.initActionButtons();
        }

        initActionButtons() {
            const actions = [
                { selector: '.fa-camera', handler: 'addPhotos' },
                { selector: '.fa-tag', handler: 'bulkEdit' },
                { selector: '.fa-ship', handler: 'shippingLabels' },
                { selector: '.fa-percent', handler: 'createDiscount' },
                { selector: '.fa-file-pdf', handler: 'exportData' }
            ];

            actions.forEach(action => {
                document.querySelectorAll(action.selector).forEach(icon => {
                    icon.closest('.action-btn').addEventListener('click', (e) => {
                        e.preventDefault();
                        this[action.handler]();
                    });
                });
            });
        }

        addPhotos() {
            this.showNotification('Photo upload tool opened', 'info');
            this.showModal('Add Photos', `
                <div class="photo-upload">
                    <div class="upload-area">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Drag & drop photos here or click to browse</p>
                        <p class="upload-hint">Maximum 10 photos, 10MB each</p>
                    </div>
                    <button class="modal-btn">Upload Photos</button>
                </div>
            `);
        }

        bulkEdit() {
            this.showNotification('Bulk edit tool opened', 'info');
            this.showModal('Bulk Edit Listings', `
                <div class="bulk-edit">
                    <p>Select listings to edit:</p>
                    <div class="checkbox-group">
                        <label><input type="checkbox"> Mega Man 2 (NES)</label><br>
                        <label><input type="checkbox"> Donkey Kong Country (SNES)</label><br>
                        <label><input type="checkbox"> Castlevania (NES)</label>
                    </div>
                    <div class="form-group">
                        <label>Action</label>
                        <select class="form-input">
                            <option>Change Price</option>
                            <option>Change Quantity</option>
                            <option>Change Condition</option>
                            <option>Remove Listings</option>
                        </select>
                    </div>
                    <button class="modal-btn">Apply to Selected</button>
                </div>
            `);
        }

        shippingLabels() {
            this.showNotification('Shipping label generator opened', 'info');
            this.showModal('Print Shipping Labels', `
                <div class="shipping-labels">
                    <p>Select orders to print labels for:</p>
                    <div class="checkbox-group">
                        <label><input type="checkbox"> #ORD-12345 - MarioFan</label><br>
                        <label><input type="checkbox"> #ORD-12346 - ZeldaFan</label><br>
                        <label><input type="checkbox"> #ORD-12347 - SonicFan</label>
                    </div>
                    <div class="form-group">
                        <label>Carrier</label>
                        <select class="form-input">
                            <option>USPS</option>
                            <option>UPS</option>
                            <option>FedEx</option>
                        </select>
                    </div>
                    <button class="modal-btn">Generate Labels</button>
                </div>
            `);
        }

        createDiscount() {
            this.showNotification('Discount creator opened', 'info');
            this.showModal('Create Discount', `
                <div class="discount-form">
                    <div class="form-group">
                        <label>Discount Type</label>
                        <select class="form-input">
                            <option>Percentage Off</option>
                            <option>Fixed Amount Off</option>
                            <option>Buy One Get One</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Value</label>
                        <input type="number" class="form-input" placeholder="20">
                    </div>
                    <div class="form-group">
                        <label>Apply to</label>
                        <select class="form-input">
                            <option>All Listings</option>
                            <option>Selected Listings</option>
                            <option>Specific Category</option>
                        </select>
                    </div>
                    <button class="modal-btn">Create Discount</button>
                </div>
            `);
        }

        exportData() {
            this.showNotification('Preparing data export...', 'info');
            
            // Simulate export
            setTimeout(() => {
                this.showNotification('Data exported successfully!', 'success');
                this.showModal('Export Complete', `
                    <div class="export-complete">
                        <i class="fas fa-check-circle" style="color: #00aa55; font-size: 3rem;"></i>
                        <p>Your data has been exported.</p>
                        <p>Filename: sales_report_feb_2025.csv</p>
                        <button class="modal-btn">Download File</button>
                    </div>
                `);
            }, 1500);
        }
    }

    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================

    class NotificationSystem {
        constructor() {
            this.createContainer();
        }

        createContainer() {
            if (!document.getElementById('notification-container')) {
                const container = document.createElement('div');
                container.id = 'notification-container';
                container.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                `;
                document.body.appendChild(container);
            }
        }

        show(message, type = 'info') {
            const container = document.getElementById('notification-container');
            const notification = document.createElement('div');
            
            const colors = {
                success: '#00aa55',
                error: '#ff5555',
                warning: '#ffaa44',
                info: '#ffaa33'
            };
            
            notification.style.cssText = `
                background: ${colors[type]};
                color: ${type === 'warning' || type === 'info' ? '#221100' : 'white'};
                padding: 1rem 1.5rem;
                border-radius: 10px;
                margin-bottom: 10px;
                border: 3px solid #4d2f19;
                box-shadow: 5px 5px 0 #4d2f19;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideIn 0.3s ease;
                position: relative;
            `;
            
            notification.innerHTML = `
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
                <button class="close-notification" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 1rem;">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            container.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                this.remove(notification);
            }, 5000);
            
            // Close button
            notification.querySelector('.close-notification').addEventListener('click', () => {
                this.remove(notification);
            });
        }

        getIcon(type) {
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };
            return icons[type];
        }

        remove(notification) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    // ========================================
    // MODAL SYSTEM
    // ========================================

    class ModalSystem {
        constructor() {
            this.createModal();
        }

        createModal() {
            if (!document.getElementById('modal-overlay')) {
                const overlay = document.createElement('div');
                overlay.id = 'modal-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(5px);
                `;
                
                const modal = document.createElement('div');
                modal.id = 'modal';
                modal.style.cssText = `
                    background: #1a120c;
                    border: 4px solid #ffaa33;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 15px 15px 0 #4d2f19;
                    position: relative;
                    animation: modalAppear 0.3s ease;
                `;
                
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
                
                // Close on overlay click
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this.close();
                    }
                });
            }
        }

        show(title, content) {
            const overlay = document.getElementById('modal-overlay');
            const modal = document.getElementById('modal');
            
            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="color: #ff9933; margin: 0;">${title}</h3>
                    <button class="close-modal" style="background: none; border: none; color: #b7a88b; font-size: 1.5rem; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            `;
            
            overlay.style.display = 'flex';
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', () => {
                this.close();
            });
        }

        close() {
            const overlay = document.getElementById('modal-overlay');
            overlay.style.display = 'none';
        }
    }
// ========================================
// CONFIRM DIALOG
// ========================================

function showConfirmDialog(title, message, onConfirm) {
    const modal = new ModalSystem();

    modal.show(title, `
        <p style="color: #e5d9c6; margin-bottom: 2rem;">${message}</p>
        <div style="display: flex; gap: 1rem;">
            <button class="modal-btn confirm-btn">
                Confirm
            </button>
            <button class="modal-btn cancel-btn">
                Cancel
            </button>
        </div>
    `);


    // Wait until modal is in DOM
    setTimeout(() => {
        const confirmBtn = document.querySelector('.confirm-btn');
        const cancelBtn = document.querySelector('.cancel-btn');

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (typeof onConfirm === "function") {
                    onConfirm();
                }
                modal.close();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                modal.close();
            });
        }
    }, 50);
}


    // ========================================
    // EXPORT FUNCTIONS TO GLOBAL SCOPE
    // ========================================

    window.showNotification = function(message, type) {
        const notifier = new NotificationSystem();
        notifier.show(message, type);
    };

    window.showModal = function(title, content) {
        const modal = new ModalSystem();
        modal.show(title, content);
    };

    window.showConfirmDialog = showConfirmDialog;

    // ========================================
    // INITIALIZE ALL MODULES
    // ========================================

    function init() {
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes modalAppear {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes barGrow {
                from {
                    height: 0;
                }
                to {
                    height: var(--height);
                }
            }
            
            .form-group {
                margin-bottom: 1rem;
            }
            
            .form-group label {
                display: block;
                color: #ff9933;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }
            
            .form-input {
                width: 100%;
                padding: 0.8rem;
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid #b87c4b;
                border-radius: 10px;
                color: #e5d9c6;
                font-family: 'Courier New', monospace;
            }
            
            .form-input:focus {
                outline: none;
                border-color: #ffaa33;
            }
            
            .checkbox-group {
                background: rgba(0, 0, 0, 0.2);
                border: 2px solid #b87c4b;
                border-radius: 10px;
                padding: 1rem;
                margin-bottom: 1rem;
            }
            
            .checkbox-group label {
                display: block;
                padding: 0.5rem 0;
                color: #e5d9c6;
            }
            
            .checkbox-group input {
                margin-right: 0.5rem;
            }
            
            .upload-area {
                background: rgba(0, 0, 0, 0.2);
                border: 3px dashed #ffaa33;
                border-radius: 15px;
                padding: 3rem;
                text-align: center;
                margin-bottom: 1rem;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .upload-area:hover {
                background: rgba(255, 170, 51, 0.1);
            }
            
            .upload-area i {
                font-size: 3rem;
                color: #ffaa33;
                margin-bottom: 1rem;
            }
            
            .upload-area p {
                color: #e5d9c6;
            }
            
            .upload-hint {
                font-size: 0.9rem;
                color: #b7a88b;
            }
            
            .modal-btn {
                background: #ffaa33;
                border: 3px solid #4d2f19;
                color: #221100;
                padding: 0.8rem 1.5rem;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                width: 100%;
                font-size: 1rem;
            }
            
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 0 #4d2f19;
            }
            
            .stats-details p {
                color: #e5d9c6;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(255, 170, 51, 0.2);
            }
            
            .stats-details p:last-child {
                border-bottom: none;
            }
            
            .tracking-info p {
                color: #e5d9c6;
                padding: 0.3rem 0;
            }
            
            .order-details p {
                color: #e5d9c6;
                padding: 0.3rem 0;
            }
            
            .export-complete {
                text-align: center;
            }
            
            .export-complete p {
                color: #e5d9c6;
                margin: 1rem 0;
            }
        `;
        document.head.appendChild(style);

        // Initialize chart
        const chart = new SalesChart('chart-container');
        
        // Initialize order manager
        const orderManager = new OrderManager();
        
        // Initialize listing manager
        const listingManager = new ListingManager();
        
        // Initialize quick actions
        const quickActions = new QuickActions();
        
        console.log('Seller Dashboard JS initialized');
    }

    // Start everything
    init();
});