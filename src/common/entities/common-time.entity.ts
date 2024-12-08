import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonTime {
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  constructor(createdAt: Date, modifiedAt: Date, deletedAt: Date) {
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.deletedAt = deletedAt;
  }
}
