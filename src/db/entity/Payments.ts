import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";

@Entity("Payments")
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("bigint")
    paymentId: number;

    @Column({ type: "varchar", length: 255 })
    buyerWallet: string;

    @Column({ type: "varchar", length: 255 })
    sellerWallet: string;

    @Column("bigint")
    amount: number;

    @Column({ type: "smallint", default: 0 })
    status: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    transactionHash?: string;

    @Column("bigint")
    date: number;

    @Column("bigint")
    expirationDate?: number;
}
